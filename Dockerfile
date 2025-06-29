# Use Node.js LTS
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
# Use nodemon for live reload in development
CMD ["npm", "run", "dev"] 