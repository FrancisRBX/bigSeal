# Use a lightweight Node.js image (Node 22 LTS)
FROM node:22-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDependencies needed for TS compilation)
RUN npm install

# Copy source code
COPY . .

# Build the TypeScript code
RUN npm run build

# --- Production Image ---
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ONLY production dependencies
RUN npm install --omit=dev

# Copy the built output from the builder stage
COPY --from=builder /app/dist ./dist

# Expose the port the express server uses (from config)
EXPOSE 5001

# Start the application
CMD ["npm", "start"]
