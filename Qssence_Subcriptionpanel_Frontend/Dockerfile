
#FROM node:20-slim

# Set working directory
#WORKDIR /app

# Copy build artifacts from local
#COPY packages/qssence-superadmin/.next /app/packages/qssence-superadmin/.next
#COPY packages/qssence-superadmin/public /app/packages/qssence-superadmin/public
#COPY packages/qssence-superadmin/package.json /app/packages/qssence-superadmin/package.json
#COPY packages/qssence-superadmin/package-lock.json /app/packages/qssence-superadmin/package-lock.json
#COPY packages/qssence-superadmin/node_modules /app/packages/qssence-superadmin/node_modules
#COPY . .

# Install production dependencies only
#RUN npm install --legacy-peer-deps
#RUN npm install -g pnpm
#RUN npm run build-superadmin

# Set working directory to where the package.json is located
#WORKDIR /app/packages/qssence-superadmin/

# Set environment variable for Next.js
#ENV NODE_ENV=production
# Expose the port the app runs on
#EXPOSE 3003

# Start the application
#CMD ["npm", "run", "start"]

# Base 
FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy build artifacts from local
#COPY packages/qssence-superadmin/.next /app/packages/qssence-superadmin/.next
COPY packages/qssence-superadmin/public /app/packages/qssence-superadmin/public
COPY packages/qssence-superadmin/package.json /app/packages/qssence-superadmin/package.json
COPY packages/qssence-superadmin/package-lock.json /app/packages/qssence-superadmin/package-lock.json
#COPY packages/qssence-superadmin/node_modules /app/packages/qssence-superadmin/node_modules
COPY . .

# Install production dependencies only
RUN npm install --legacy-peer-deps
RUN npm install -g pnpm
RUN pnpm install
RUN npm run build-superadmin

# Set working directory to where the package.json is located
WORKDIR /app/packages/qssence-superadmin/

# Set environment variable for production
ENV NODE_ENV=production

# Expose the application port
EXPOSE 3003

# Start the application
CMD ["npm", "run", "start"]
