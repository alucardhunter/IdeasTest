FROM node:18-alpine3.16

WORKDIR /usr/src/app

RUN apk add --no-cache openssl

COPY package.json package-lock.json ./


RUN npm ci

COPY . .

COPY docker-entrypoint.sh /usr/src/bin/docker-entrypoint.sh
RUN chmod +x /usr/src/bin/docker-entrypoint.sh

EXPOSE 4000

ENTRYPOINT ["/usr/src/bin/docker-entrypoint.sh"]
CMD ["sh", "-c", "npm run dev"]
