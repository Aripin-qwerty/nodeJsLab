# Use an official Node.js runtime as a parent image
FROM node:20 as builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code to the working directory
COPY . .

# Second Stage: Create a smaller image for production
FROM node:20-slim

# Set the working directory
WORKDIR /app

# Copy only the necessary files from the builder stage
COPY package*.json ./
RUN npm ci --ommit=dev

# Copy the built application from the builder stage
COPY --from=builder /app/server.js ./
COPY --from=builder /app/routes ./routes
COPY --from=builder /app/controllers ./controllers

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start:watch"];
