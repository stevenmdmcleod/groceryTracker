const {logger} = require('./logger');
const http = require('http');

const PORT = 3000;

const server = http.createServer((req, res) => {
    let body = "";


    logger.info(`${req.method}: ${req.url}`);

    const contentType = {"Content-Type": "application/json"};
    res.setHeader('Content-Type', 'application/json');

    req
        .on('data', (chunk) => {
            body += chunk;
        })
        .on("end", () => {
            body = body.length > 0 ? JSON.parse(body) : {};

            
            if (req.url.startsWith("/items")){
                logger.info(req.url.split('/'));
                let index = parseInt(req.url.split("/")[2]);

                switch(req.method){
                    case "GET":
                        logger.info('GET request made');
                        res.statusCode = 200;
                        res.end(
                            JSON.stringify({
                                message: "request received!"
                                
                            })
                        )
                        break;
                    case "POST":
                        const {name, price} = body;
                        if (!name || !price){
                            //res.writeHead(400, contentType);
                            res.end(
                                JSON.stringify({
                                    message: "Please provide a valid name and price"
                                })
                            )
                        }
                        
                        else{

                            res.end(
                                JSON.stringify({
                                    message: "Item Added to List!",
                                    name,
                                    price
                                })
                            )
                        }
                        break;
                }
            }
        })
});

server.listen(PORT, () => {
    logger.info(`Server is listening on http://localhost:${PORT}`);
});