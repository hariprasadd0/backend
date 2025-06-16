
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
├── bin/             #executable
├── package.json
├── tsconfig.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- pnpm

### Installation

1. Clone the repository (if you haven't already):

    ```bash
    git clone https://github.com/hariprasadd0/backend.git
    cd backend/caching-proxy
    ```

2. Install dependencies:

    ```bash
    pnpm install
    ```

### Running the Proxy

```bash
caching-proxy --port 3000 --origin http://example.com 
```

### Usage
``--port <number>`` — Port to run the proxy on

`--origin <url>` — Origin endpoint to proxy and cache

`--clear-cache` — Clears the in-memory cache




