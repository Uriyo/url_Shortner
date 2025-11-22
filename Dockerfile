FROM node:22.20.0-alpine

WORKDIR /app
COPY package*.json  ./
RUN npm install
COPY . ./
EXPOSE 8000
CMD ["node", "index.js"] 