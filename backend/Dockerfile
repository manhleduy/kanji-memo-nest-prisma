# Stage 1: Build the NestJS app
FROM node:20-alpine AS builder

WORKDIR /kanji/backend

COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Run the application
CMD ["node", "dist/src/main.js"]