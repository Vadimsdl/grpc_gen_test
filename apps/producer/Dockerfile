FROM node:24-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --ignore-scripts
COPY . .
RUN npx nest build producer

FROM node:24-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev --ignore-scripts
COPY --from=builder /app/dist/apps/producer ./dist/apps/producer
COPY proto ./proto
COPY apps/producer/src/data ./apps/producer/src/data
ENV GRPC_URL=0.0.0.0:50051
EXPOSE 50051
CMD ["node", "dist/apps/producer/main"]
