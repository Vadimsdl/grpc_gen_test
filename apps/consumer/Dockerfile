FROM node:24-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --ignore-scripts
COPY . .
RUN npx nest build consumer

FROM node:24-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev --ignore-scripts
COPY --from=builder /app/dist/apps/consumer ./dist/apps/consumer
COPY proto ./proto
ENV PRODUCER_URL=producer:50051
CMD ["node", "dist/apps/consumer/main"]
