# Use an official Node.js runtime as a parent image
FROM node:14-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Build the React app
RUN npm run build

# Set the environment variable
ENV NODE_ENV=production

# Expose the port that the app will listen on
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
