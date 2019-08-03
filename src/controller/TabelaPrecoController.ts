const csv = require('csvtojson')

import { JsonController, Post, UploadedFile } from "routing-controllers";
import { getRepository } from "typeorm";
import { TabelaPreco } from "../entity/TabelaPreco";

@JsonController()
export class TabelaController {

    tabelaPrecoRepository = getRepository(TabelaPreco);

    @Post("/csv")
    saveFile(@UploadedFile("csv") file: any) {

        csv()
            .fromFile(file)
            .then((jsonObj) => {

                //Persist tabela preco to database
                this.tabelaPrecoRepository.save(jsonObj);
            })
    }
}