# URL Shortener Backend

This is the backend repository for the URL Shortener Web App. This service handles the URL shortening, captures the IP address and location of users accessing the shortened links, and integrates tracking functionalities for Meta (Facebook) and Google Analytics.

## Features

1. **URL Shortening**: Shortens long URLs and generates a unique ID for each shortened URL.

## Installation

To run this project locally, follow these steps:

1. **Clone the repository**:
    ```bash
    https://github.com/Uriyo/urlShortener.git
    cd url-shortener-backend
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up environment variables**:
    Create a `.env` file in the root directory with the following content:
    ```env
    MONGODB_URI=your-mongodb-uri
    PORT=8000
    BASE_URL=your-base-url
    ```

4. **Start the server**:
    ```bash
    npm start
    ```

## API Endpoints

## 1. Health Check
```bash
curl -X GET http://localhost:3000/healthz
```

<img width="1470" height="956" alt="Screenshot 2025-11-22 at 6 44 26 PM" src="https://github.com/user-attachments/assets/341ce365-84bf-44c5-8d1f-dd2bc7a7da60" />

## 2. Create Short URL (Auto-generated short ID)
```bash
curl -X POST http://localhost:3000/api/links \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://www.example.com"
  }'
```
<img width="1470" height="956" alt="Screenshot 2025-11-22 at 6 53 37 PM" src="https://github.com/user-attachments/assets/ee066b1b-2f7c-4a40-acf8-4da2ee667244" />


## 3. Create Short URL (With Custom Code)
```bash
curl -X POST http://localhost:3000/api/links \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://www.example.com",
    "customCode": "mycode1"
  }'
```
<img width="1470" height="956" alt="Screenshot 2025-11-22 at 6 52 37 PM" src="https://github.com/user-attachments/assets/c2b0da5b-aa6d-4327-8625-3aea2a4367f9" />

## 4. Get All URLs (Default pagination)
```bash
curl -X GET http://localhost:3000/api/links
```
<img width="1470" height="956" alt="Screenshot 2025-11-22 at 6 54 29 PM" src="https://github.com/user-attachments/assets/1a8b8b16-99ab-458d-8808-abdd624cced2" />

## 5. Get Analytics for a Short URL
```bash
curl -X GET http://localhost:3000/api/links/{shortId}
```
<img width="1470" height="956" alt="Screenshot 2025-11-22 at 6 55 26 PM" src="https://github.com/user-attachments/assets/7a68d4ce-327a-4ec1-9524-6afb8f7a6da6" />


## Learning Experience

This project provided a great opportunity to deepen my understanding of building backend services, handling IP and location detection, and integrating tracking functionalities.



