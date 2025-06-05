import * as http from "http";


const startServer = async (port : number) => {

    const server = http.createServer((req, res) => {})
    server.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    })
}

export { startServer };