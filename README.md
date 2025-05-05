# React App Setup Instructions

This project is a React-based frontend application.

## Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine (v14 or higher recommended)
- npm comes with Node.js

## Getting Started

Follow these steps to install dependencies and run the development server.

### 1. Navigate to the Frontend Directory

```bash
cd frontend
```
### 2. Install project dependencies:
```bash
npm install
```
This will install all necessary packages listed in package.json.

### 3. Set up environment variables:
Create a `.env` file in the `frontend` directory and add the following line:
```bash
REACT_APP_NOGGIN_AI=Bearer your_api_token_here
REACT_APP_NOGGIN_MAP=Bearer your_api_token_here
```
- This token is required to authenticate requests to the AI API.
- Make sure the `.env` file is **not committed** to version control — add `.env`

### 4. Start the development server:
```bash
npm start
```
This will run the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload if you make edits. You will also see any lint errors in the console.