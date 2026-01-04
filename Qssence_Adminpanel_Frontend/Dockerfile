# Base 
FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy build artifacts from local
#COPY packages/qssence-admin/.next /app/packages/qssence-admin/.next
COPY packages/qssence-admin/public /app/packages/qssence-admin/public
COPY packages/qssence-admin/package.json /app/packages/qssence-admin/package.json
COPY packages/qssence-admin/package-lock.json /app/packages/qssence-admin/package-lock.json
#COPY packages/qssence-admin/node_modules /app/packages/qssence-admin/node_modules
COPY . .

# Install production dependencies only
RUN npm install --legacy-peer-deps
RUN npm install -g pnpm
RUN pnpm install 
RUN npm run build-admin

# Set working directory to where the package.json is located
WORKDIR /app/packages/qssence-admin/

# Set environment variable for production
ENV NODE_ENV=production

# Expose the application port
EXPOSE 3001

# Start the application
CMD ["npm", "run", "start"]


# Use a smaller base image (Alpine is faster & smaller)
#FROM node:20-alpine AS builder

# Set working directory
#WORKDIR /app

# Copy only package.json & lock file first (caches dependencies)
#COPY packages/qssence-admin/package.json /app/packages/qssence-admin/package.json
#COPY packages/qssence-admin/package-lock.json /app/packages/qssence-admin/package-lock.json

# Copy the rest of the application files
#COPY packages/qssence-admin /app/packages/qssence-admin
#COPY . .
# Install dependencies first to leverage caching
#RUN npm install -g npm@11.1.0
#RUN npm install -g concurrently pnpm

# Build the application
#RUN npm run build-admin

# Use a smaller runtime image
#FROM node:20-alpine

#WORKDIR /app

# Copy built files from builder stage
#COPY --from=builder /app/packages/qssence-admin /app/packages/qssence-admin

# Set environment variable for Next.js
#ENV NODE_ENV=production

# Expose the port
#EXPOSE 3001

# Start the application
#CMD ["npm", "run", "start"]
