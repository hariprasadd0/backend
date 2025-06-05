import {startServer} from "./server";

const args =process.argv.slice(2);
if (args.length < 2 || !args) {
    console.error('Usage: node caching-proxy <port> <origin-url>');
    process.exit(1);
}
const getArgValue = (flag: string): string | undefined => {
    const index = args.indexOf(flag);
    return index !== -1 ? args[index + 1] : undefined;
}

const port = Number(getArgValue('--port'))
const originUrl  = new URL(getArgValue('--origin-url')!);

if (!originUrl) {
    console.error('origin url not found');
}
if (!port) {
    console.error('port not found');
}

//startServer