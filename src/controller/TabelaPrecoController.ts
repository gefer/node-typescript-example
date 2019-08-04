const csv = require('csvtojson')

import { JsonController, UploadedFile, Post } from "routing-controllers";
import { getRepository } from "typeorm";
import { TabelaPreco } from "../entity/TabelaPreco";

@JsonController()
export class TabelaPrecoController {

    tabelaPrecoRepository = getRepository(TabelaPreco);

    @Post("/tabela/csv")
    uploadFile(@UploadedFile("fileName") file: any) {

        csv()
            .fromFile(file)
            .then((jsonObj) => {

                const tab = new TabelaPreco();

                //fields

                this.tabelaPrecoRepository.save(tab);
            })
    }
}