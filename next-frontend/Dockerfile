# Dockerfile for Next.js frontend
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
# Install react-leaflet compatible with React 18
RUN npm install react-leaflet@4.2.1 leaflet
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]
