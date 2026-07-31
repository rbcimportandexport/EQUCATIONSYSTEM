# Stage 1: Build React Vite Application
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Express Server & Application Server
FROM node:20-alpine
WORKDIR /app
COPY server/package*.json ./server/
RUN cd server && npm ci
COPY server/ ./server/
COPY --from=builder /app/dist ./server/public

EXPOSE 5000

ENV NODE_ENV=production
ENV PORT=5000

CMD ["node", "server/index.js"]
