# Use an official Node runtime as the base image
FROM node:14

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install the app dependencies
RUN npm install
RUN npm install -g npm-watch

# Bundle app source
COPY . .

# Expose the app on port 3000
EXPOSE 3000

# Start the app
CMD ["npm", "run","watch"]