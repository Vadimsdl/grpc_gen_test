# gRPC test task

Producer reads users.json, filters age > 18, returns `["Name (Age)"]`.
Consumer calls producer over gRPC and prints the result.

Proto: `proto/users.proto`
Producer: `apps/producer`
Consumer: `apps/consumer`
Generated types: `libs/users-proto/src/generated/users.pb.ts`

## Versions

- Node 24.14 (20+ should work too)
- npm 11
- NestJS 12
- TypeScript 6
- Docker 28 / compose v2 - only for docker run

## Install

```
npm install
```

## Run

Terminal 1:

```
npm run start:producer
```

Terminal 2:

```
npm run start:consumer
```

Output:

```
Filtered Users: [
  "Alice (25)",
  "Charlie (30)",
  "Diana (19)",
  "George (75)",
  "Ivan (19)"
]
```

Consumer exits after printing. If producer is down it retries 10 times (1 sec pause) and exits with code 1.

Build and run from dist:

```
npm run build
npm run start:prod:producer
npm run start:prod:consumer
```

## Docker

```
docker compose up --build
```

Producer stays up on 50051, consumer prints and exits.

## Env

```
GRPC_URL      producer   default 0.0.0.0:50051
PRODUCER_URL  consumer   default localhost:50051
USERS_FILE    producer   default apps/producer/src/data/users.json
```

## Proto generation

Generated file is committed. Regenerate only if you change users.proto:

```
npm run proto:gen
```

Uses grpc-tools(protoc comes with it) + ts-proto with nestJs=true. No system protoc needed

## Check

```
npm run build
npm run lint
```

Call producer directly without consumer:

```
grpcurl -plaintext -import-path ./proto -proto users.proto localhost:50051 users.UserService/GetFilteredUsers
```
