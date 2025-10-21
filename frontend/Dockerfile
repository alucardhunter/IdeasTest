# Dockerfile - frontend React (Vite) - run tests during build
FROM node:20-alpine

# Define build arguments for environment variables
ARG VITE_API_BASE

# Set environment variables during the build process
ENV VITE_API_BASE=$VITE_API_BASE

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Run frontend tests - fail build if tests fail
RUN npm test
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
