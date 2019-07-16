import "reflect-metadata";
import { createConnection } from "typeorm";

import { createExpressServer } from "routing-controllers";
import { UserController } from "./controller/UserController";
import { ProductController } from "./controller/ProductController";

//Estabelece a conexão com o banco de dados
createConnection().then(async connection => {

    const server = createExpressServer({
        controllers: [
            UserController,
            ProductController
        ]
    });

    server.listen(3001);

}).catch(error => { console.log(error) });
