import "reflect-metadata";
import { createConnection } from "typeorm";

import { createExpressServer } from "routing-controllers";
import { XMLController } from "./controller/XmlController";

//Estabelece a conexão com o banco de dados
createConnection().then(async connection => {

    const server = createExpressServer({
        controllers: [
            XMLController
        ]
    });

    server.listen(3001);

}).catch(error => { console.log(error) });
