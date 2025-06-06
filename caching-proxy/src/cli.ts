import {startServer} from "./server";
import {Caching} from "./cache";
import * as process from "node:process";

const cache = new Caching();
const args =process.argv.slice(2);
const getArgValue = (flag: string): string | undefined => {
    const index = args.indexOf(flag);
    return index !== -1 ? args[index + 1] : undefined;
}


// const clearCache = args.includes('--clear-cache');
// if (clearCache) {
//     cache.clearAllCache()
//     process.exit(0)
// }
const port = Number(getArgValue('--port'))

const originArg = getArgValue('--origin');

if (!originArg) {
    console.error('Missing --origin argument');
    process.exit(1);
}

let originUrl: URL;
try {
    originUrl = new URL(originArg);
} catch (e) {
    console.error('Invalid origin URL:', originArg);
    process.exit(1);
}
if (!port) {
    console.error('port not found');
    process.exit(1);
}

//startServer
startServer(port,originUrl,cache).then(() => {
    console.log(`Proxy Server started at http://localhost:${port}`);
})