
FROM node:alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install --production && npm cache clean --force

COPY app.js .

FROM node:alpine AS final

WORKDIR /app
 
COPY --from=builder /app .

EXPOSE 8080

ENV NODE_ENV=production

CMD ["node", "app.js"]
