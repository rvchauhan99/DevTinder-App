# Use official Node.js image as base
FROM node:18

# Set the working directory
WORKDIR /

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --omit=dev

# Copy the entire application
COPY . .

# Expose port (make sure it matches your Node.js app)
EXPOSE 5141

# Start the application
CMD ["node", "index.js"]
