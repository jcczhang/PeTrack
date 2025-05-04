from flask import Flask, request, jsonify
from torchvision import models, transforms
from collections import Counter
import torch
from PIL import Image
import io
from flask_cors import CORS

import os
import json

from numpy import dot
from numpy.linalg import norm
import numpy as np



app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

FEATURES_FILE = 'data/features.json'
os.makedirs('data', exist_ok=True)  # 确保data目录存在



device = torch.device('cpu')

model = models.resnet18(pretrained=True).to(device)
model.eval()


feature_extractor = models.resnet18(pretrained=True)
feature_extractor = torch.nn.Sequential(*list(feature_extractor.children())[:-1])  # 去掉fc
feature_extractor = feature_extractor.to(device)
feature_extractor.eval()

preprocess = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                         std=[0.229, 0.224, 0.225])
])


with open('imagenet_classes.txt') as f:
    labels = [line.strip() for line in f.readlines()]
# 1 recognize auto fill form
@app.route('/api/analyze-pet', methods=['POST'])
def analyze_pet():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400

    image_file = request.files['image']
    image = Image.open(io.BytesIO(image_file.read()))
    if image.mode != 'RGB':
        image = image.convert('RGB')

    #pre-process image
    input_tensor = preprocess(image).unsqueeze(0).to(device)
    with torch.no_grad():
        output = model(input_tensor)
        _, predicted_idx = torch.max(output, 1)
        label = labels[predicted_idx.item()]

    # label
    label_lower = label.lower()

    if any(keyword in label_lower for keyword in ['dog', 'retriever', 'poodle', 'terrier', 'husky', 'beagle']):
        pet_type = 'Dog'
    elif any(keyword in label_lower for keyword in ['cat', 'kitten', 'tabby', 'siamese', 'persian', 'ragdoll']):
        pet_type = 'Cat'
    else:
        pet_type = 'Unknown'


    #color
    dominant_rgb = extract_dominant_color(image)

    #rgb color
    r, g, b = dominant_rgb
    if r > 200 and g > 200 and b > 200:
        color_name = 'White'
    elif r < 50 and g < 50 and b < 50:
        color_name = 'Black'
    elif r > g and r > b:
        color_name = 'Golden'
    elif g > r and g > b:
        color_name = 'Greenish'
    elif b > r and b > g:
        color_name = 'Bluish'
    else:
        color_name = 'Unknown'


    # return
    response = {
        'petType': pet_type,
        'breed': label,
        'color': color_name,   
        'sex': 'Unknown',
        'weight': 'Unknown'
    }

    return jsonify(response)

def extract_dominant_color(image, k=4, resize=150):
    # Resize image
    image = image.copy()
    image.thumbnail((resize, resize))

    # Convert to RGB
    image = image.convert('RGB')

    pixels = list(image.getdata())
    pixel_count = Counter(pixels)
    most_common = pixel_count.most_common(k)

    #return color
    dominant_rgb = most_common[0][0]
    return dominant_rgb

#2 save
@app.route('/api/save-feature', methods=['POST'])
def save_feature():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400

    # image
    image_file = request.files['image']
    image = Image.open(io.BytesIO(image_file.read()))
    if image.mode != 'RGB':
        image = image.convert('RGB')

    pet_name = request.form.get('name', 'Unknown')
    pet_type = request.form.get('type', 'Unknown')
    pet_breed = request.form.get('breed', 'Unknown')

    # feature
    input_tensor = preprocess(image).unsqueeze(0).to(device)
    with torch.no_grad():
        features = feature_extractor(input_tensor)  # Shape: [1,512,1,1]
        features = features.view(-1).cpu().numpy().tolist()
    
    # info
    if os.path.exists(FEATURES_FILE):
        with open(FEATURES_FILE, 'r') as f:
            database = json.load(f)
    else:
        database = []

    # id
    new_id = max((pet.get('id', 0) for pet in database), default=0) + 1


    pet_data = {
        'id': new_id,
        'name': pet_name,
        'type': pet_type,
        'breed': pet_breed,
        'feature': features
    }

    # 添加新的宠物特征
    database.append(pet_data)

    # 保存回文件
    with open(FEATURES_FILE, 'w') as f:
        json.dump(database, f, indent=2)

    return jsonify({'message': 'Feature saved successfully!', 
                    'new_id': new_id,
                    'total_entries': len(database)})

# 3 search

# 计算两个向量之间的余弦相似度
def cosine_similarity(a, b):
    a = np.array(a)
    b = np.array(b)
    return dot(a, b) / (norm(a) * norm(b))

@app.route('/api/search-feature', methods=['POST'])
def search_feature():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400

    # 接收图片
    image_file = request.files['image']
    image = Image.open(io.BytesIO(image_file.read()))
    if image.mode != 'RGB':
        image = image.convert('RGB')

    # 提取当前图片的特征
    input_tensor = preprocess(image).unsqueeze(0).to(device)
    with torch.no_grad():
        query_feature = feature_extractor(input_tensor)
        query_feature = query_feature.view(-1).cpu().numpy().tolist()




    # 读取已有特征数据
    if not os.path.exists(FEATURES_FILE):
        return jsonify({'error': 'No database found'}), 500

    with open(FEATURES_FILE, 'r') as f:
        database = json.load(f)

    # 遍历比对
    similarities = []
    for entry in database:
        score = cosine_similarity(query_feature, entry['feature'])
        similarities.append((score, entry))

    # 按相似度降序排列
    similarities.sort(reverse=True, key=lambda x: x[0])

    # 取Top 3（或者Top 1）
    top_matches = similarities[:3]

    # 返回结果
    result = []
    for score, pet in top_matches:
        result.append({
            'id': pet['id'],
            'name': pet['name'],
            'type': pet['type'],
            'breed': pet['breed'],
            'similarity': round(score, 4)  
        })

    return jsonify({'matches': result})


if __name__ == '__main__':
    app.run(debug=True, port=5000)


