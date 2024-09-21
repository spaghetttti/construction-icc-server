FROM node:alpine as builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

ENV NODE_ENV=production
# ENV DATABASE_URL=postgres://myuser:secret@172.17.0.2:5432/mydatabase      
# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Use a smaller base image for production
FROM node:alpine

# Copy the built application
COPY --from=builder /app /app

# Set the working directory
WORKDIR /app

# Expose the port your application listens on (e.g., 3000)
EXPOSE 3000

# Start the application
CMD ["node", "dist/main.js"]