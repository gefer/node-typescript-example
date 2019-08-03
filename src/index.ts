import "reflect-metadata";
import { createConnection } from "typeorm";

import { createExpressServer } from "routing-controllers";

//Estabelece a conexão com o banco de dados
createConnection().then(async connection => {

    const server = createExpressServer({
        controllers: [
        ]
    });

    server.listen(3001);

}).catch(error => { console.log(error) });
