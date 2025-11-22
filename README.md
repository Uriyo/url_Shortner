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



## Learning Experience

This project provided a great opportunity to deepen my understanding of building backend services, handling IP and location detection, and integrating tracking functionalities.



