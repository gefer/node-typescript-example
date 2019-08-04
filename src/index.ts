import "reflect-metadata";
import { createConnection } from "typeorm";

import { createExpressServer } from "routing-controllers";
import { XMLController } from "./controller/XmlController";
import { TabelaPrecoController } from "./controller/TabelaPrecoController";

//Estabelece a conexão com o banco de dados
createConnection().then(async connection => {

    const server = createExpressServer({
        controllers: [
            XMLController,
            TabelaPrecoController
        ]
    });

    server.listen(3001);

    console.log("API Conectada na porta 3001");

}).catch(error => { console.log(error) });
