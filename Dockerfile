# Use Node.js LTS as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies first
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --force

# Copy the rest of the application files
COPY . .

# Expose port 3000 for the React app
EXPOSE 3000

# Start the React application
CMD ["npm", "start"]
