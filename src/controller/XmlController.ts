var parser = require('xml2json');

import { JsonController, Post, UploadedFile } from "routing-controllers";
import { getRepository } from "typeorm";
import { TabelaPreco } from "../entity/TabelaPreco";
import { Legenda } from "../entity/Legenda";

@JsonController()
export class XMLController {

    tabelaPrecorepository = getRepository(TabelaPreco);
    legendaRepository = getRepository(Legenda);

    @Post("/xml")
    saveFile(@UploadedFile("fileName") file: any) {

        // Importar xml de entrada e converte para json
        var json = parser.toJson(file);

        //load Cod Prestador
        let codPrestador = json.cabecalho.origem.identificacaoPrestador.codigoPrestadorNaOperadora;

        //Carrega a tabela de preço 
        let ultTabelaPreco = this.legendaRepository
            .createQueryBuilder("leg")
            .innerJoinAndSelect("leg.tabelaPreco", "TabelaPreco")
            .where("leg.prestador = :prestador")
            .orderBy("tab.dataVigencia", "DESC")
            .take(1)
            .setParameters({ prestador: codPrestador })
            .getOne();

        //Pega a penúltima tabela de preço
        let PenultTabelaPreco = this.legendaRepository
            .createQueryBuilder("leg")
            .innerJoinAndSelect("leg.tabelaPreco", "TabelaPreco")
            .where("leg.prestador = :prestador")
            .orderBy("tab.dataVigencia", "DESC")
            .skip(1)
            .take(1)
            .setParameters({ prestador: codPrestador })
            .getOne(); 

        //Validacoes do Xml

        //Gera novo XML com as informações contidas
    }
}