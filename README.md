# speed-test

A lightweight HTTP server for testing internet speed and bandwidth by streaming data of specified sizes.

## Features

- Stream data of any size to test download speeds
- Configurable via environment variables
- Health check endpoint
- Docker support

## Docker

### Using Prebuilt Image

```bash
docker run -p 8080:80 ravshansbox/speed-test
```

Test it:

```bash
curl -o /dev/null "http://localhost:8080"
```

With custom configuration:

```bash
docker run -p 8080:80 -e DEFAULT_SIZE=512 -e CHUNK_SIZE=128 ravshansbox/speed-test
```

### Build Your Own

```bash
docker build -t speed-test .
docker run -p 8080:80 speed-test
```

## Installation

```bash
npm install
```

## Usage

### Development

```bash
npm start
```

This starts the server on port 3000 with hot reload enabled.

### Production

```bash
HTTP_PORT=8080 node src/index.mjs
```

## Environment Variables

- `HTTP_PORT` - Port to listen on (default: `80`)
- `DEFAULT_SIZE` - Default data size in MB (default: `1024`)
- `CHUNK_SIZE` - Chunk size in KB for streaming (default: `64`)

## API Endpoints

### `GET /`

Streams random data for speed testing.

**Query Parameters:**

- `size` (optional) - Size of data to stream in MB. Defaults to `DEFAULT_SIZE` (1024 MB).

**Example:**

```bash
curl -o /dev/null "http://localhost:3000/"
curl -o /dev/null "http://localhost:3000/?size=100"
```

### `GET /health`

Health check endpoint.

**Response:** `Status: OK`

## License

MIT
