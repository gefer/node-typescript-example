import "reflect-metadata";
import { createConnection } from "typeorm";

import {createConnection} from "typeorm";

import {createExpressServer, Header} from "routing-controllers";
import {XMLController} from "./controller/XmlController";
import {TabelaPrecoController} from "./controller/TabelaPrecoController";
import * as app from "express";

import * as cors from "cors";
const Koa = require('koa');
const corsDeMerda = require('@koa/cors');

//Estabelece a conexão com o banco de dados
createConnection().then(async connection => {

    let API_URL = "http://localhost:3001";

    const app = new Koa();

    const options:cors.CorsOptions = {
        exposedHeaders: ["Access-Control-Allow-Origin", "*"],
        allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
        credentials: true,
        methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
        origin: API_URL,
        preflightContinue: false
    };

    app.use(corsDeMerda());

    const server = createExpressServer({
        controllers: [
            XMLController,
            TabelaPrecoController
        ],
        cors: app
    });


    server.listen(3001);

    console.log("API Conectada na porta 3001");

}).catch(error => {
    console.log(error)
});
