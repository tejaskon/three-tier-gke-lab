FROM node:20-alpine AS builder
WORKDIR /app
COPY src/package*.json ./
RUN npm install
COPY src/ ./

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app /app
USER node
EXPOSE 3000
CMD ["npm", "start"]