# Base 
FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy build artifacts from local

COPY packages/qssence-dms/public /app/packages/qssence-dms/public
COPY packages/qssence-dms/package.json /app/packages/qssence-dms/package.json
COPY packages/qssence-dms/package-lock.json /app/packages/qssence-dms/package-lock.json
COPY . .

# Install production dependencies only
RUN npm install -g npm@11.5.2
RUN npm install -g pnpm
RUN pnpm install 
RUN npm run build-dms

# Set working directory to where the package.json is located
WORKDIR /app/packages/qssence-dms/

# Set environment variable for production
ENV NODE_ENV=production

# Expose the application port
EXPOSE 3001

# Start the application
CMD ["npm", "run", "start"]

