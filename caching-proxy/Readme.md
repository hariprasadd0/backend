
# Caching Proxy

A CLI tool that starts a proxy server to forward requests, cache responses, and return cached data for repeated requests

## Features

- HTTP proxying for backend APIs or static resources
- Configurable in-memory or persistent cache
- Cache expiration


## Directory Structure

```text
caching-proxy/
├── src/               
│   ├── cli.ts 
│   ├── cache.ts
│   └── server.ts           
├── bin/             # executable
├── package.json
├── tsconfig.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- pnpm or yarn

### Installation

1. Clone the repository (if you haven't already):

    ```bash
    git clone https://github.com/hariprasadd0/backend.git
    cd backend/caching-proxy
    ```

2. Install dependencies:

    ```bash
    pnpm install
    # or
    yarn install
    ```

### Running the Proxy

```bash
caching-proxy --port 3000 --origin http://example.com 
cahcing-proxy --clear-cache
```

The proxy should now be running on the configured port (default: `3000`). You can configure the port and other settings in the `.env` file or in `config.ts`.

### Usage

Send your HTTP requests to the proxy server. It will forward requests, cache responses according to the defined strategy, and serve cached responses when appropriate.

Example:

```bash
curl http://localhost:3000/api/data
```

