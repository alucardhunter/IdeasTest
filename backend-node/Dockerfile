# Dockerfile - backend Node.js (runs tests during image build; build fails on test failures)
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Generate prisma client (no DB required for mocked tests)
RUN npx prisma generate || true
# Run tests — if tests fail, build fails
RUN npm test
EXPOSE 4000
CMD ["npm", "run", "dev"]
