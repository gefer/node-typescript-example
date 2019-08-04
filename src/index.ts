import "reflect-metadata";
import {createConnection} from "typeorm";

import {createExpressServer} from "routing-controllers";
import {XMLController} from "./controller/XmlController";
import {TabelaPrecoController} from "./controller/TabelaPrecoController";
import * as app from "express";

import * as cors from "cors";

//Estabelece a conexão com o banco de dados
createConnection().then(async connection => {


    //options for cors midddleware
    const options: cors.CorsOptions = {
        allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
        credentials: true,
        methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
        preflightContinue: false
    };

    const server = createExpressServer({
        controllers: [
            XMLController,
            TabelaPrecoController
        ]
    });

    server.listen(3001);

    console.log("API Conectada na porta 3001");

}).catch(error => {
    console.log(error)
});
