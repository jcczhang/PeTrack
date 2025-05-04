from flask import Flask, request, jsonify
from torchvision import models, transforms
from collections import Counter
import torch
from PIL import Image
import io
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


device = torch.device('cpu')

model = models.resnet18(pretrained=True).to(device)
model.eval()


preprocess = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                         std=[0.229, 0.224, 0.225])
])


with open('imagenet_classes.txt') as f:
    labels = [line.strip() for line in f.readlines()]

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

if __name__ == '__main__':
    app.run(debug=True, port=5000)
