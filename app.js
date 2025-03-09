const {logger} = require('./logger');
const http = require('http');
const {addItem, removeItem, buyItem, display} = require('./grocerytracker')

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
                let index = parseInt(req.url.split("/"));
                console.log(index);

                switch(req.method){
                    case "GET":
                        logger.info('GET request made');
                        res.statusCode = 200;
                        let groceryList = display();
                        res.end(
                            JSON.stringify({
                                message: "request received! Sending grocery list...",
                                groceryList
                                
                            })
                        )
                        break;
                    case "POST":
                        var {name, quantity, price} = body;
                        if (!name || !quantity||!price){
                            res.writeHead(400, { 'Content-Type': 'application/json' });
                            //res.write(JSON.stringify(chunk));

                            res.end(
                                JSON.stringify({
                                    message: "Please provide a valid name, quantity, and price"
                                })
                            )
                        }
                        
                        else{
                            res.statusCode = 201;
                            //res.write(JSON.stringify(chunk));
                            item = addItem(name, Number(quantity), Number(price));
                            res.end(
                                
                                JSON.stringify({
                                    message: "Item Added to List!",
                                    item
                                })
                            );
                        }
                        break;
                    
                        case "DELETE":
                            //const {} = body;
                            var {name} = body;
                            if(removeItem(name) == false){
                                res.statusCode = 400;
                                res.end(
                                
                                    JSON.stringify({
                                        message: "Item Not Found",
                                        
                                    })
                                );
                            }
                            else{
                                res.statusCode = 200;
                                res.end(
                                
                                    JSON.stringify({
                                        message: "Item Successfully removed!",
                                        
                                    })
                                );
                            }
                            break;
                            case "PATCH":
                            var {name} = body;
                            if(buyItem(name) == false){
                                res.statusCode = 400;
                                res.end(
                                
                                    JSON.stringify({
                                        message: "Item Not Found",
                                        
                                    })
                                );
                            }
                            else{
                                res.statusCode = 200;
                                res.end(
                                
                                    JSON.stringify({
                                        message: "Item Successfully bought!",
                                        
                                    })
                                );
                            }
                                break;
                }
            }
        })
});

server.listen(PORT, () => {
    logger.info(`Server is listening on http://localhost:${PORT}`);
});