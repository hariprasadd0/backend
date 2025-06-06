import * as http from "http";
import {Caching} from "./cache";

const startServer = async (port : number,url:string|URL,cache:Caching) => {

    const server = http.createServer(async(req, res) => {
        const path = req.url || "/";
        const targetUrl = new URL(path, url).toString()
        const cached = cache.getCache(targetUrl)

        if (cached) {
            res.writeHead(200, {
                'Content-Type': 'application/json',
                'X-Cache': 'HIT',
                'Cache-Control': 'max-age=60'
            });
            return res.end(JSON.stringify(cached));
        }

        try {
        const response = await fetch(targetUrl)
        const data = await response.json()
        cache.setCache(targetUrl, data);
            res.writeHead(200, {
                'Content-Type': 'application/json',
                'X-Cache': 'MISS',
                'Cache-Control': 'max-age=60'
            });
            return res.end(JSON.stringify(data));
        }catch (e) {
            res.writeHead(502, { 'Content-Type': 'text/plain' });
            return res.end('Failed to fetch target URL');
        }
    })
    server.listen(port,()=>{
        console.log(`Server listening on port ${port}`);
    })

}

export { startServer };