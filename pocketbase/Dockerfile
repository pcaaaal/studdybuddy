FROM golang:1.24-alpine AS builder

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download

COPY . .

RUN go build -o pocketbase

FROM alpine:latest

RUN addgroup -S pocketbasegroup && adduser -S pocketbaseuser -G pocketbasegroup

WORKDIR /app

RUN mkdir -p /app/pb_data && chown -R pocketbaseuser:pocketbasegroup /app /app/pb_data

COPY --chown=pocketbaseuser:pocketbasegroup --from=builder /app/pocketbase /app/pocketbase

USER pocketbaseuser

EXPOSE 8090

CMD ["/app/pocketbase", "serve", "--http", "0.0.0.0:8090"]
