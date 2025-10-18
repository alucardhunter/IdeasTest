# Dockerfile - frontend React (Vite) - run tests during build
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Run frontend tests - fail build if tests fail
RUN npm test
RUN npm run build
EXPOSE 5173
CMD ["npm", "run", "preview"]
