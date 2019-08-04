const parser = require('xml2json');

import { JsonController, Post, UploadedFile } from "routing-controllers";
import { getRepository } from "typeorm";
import { Legenda } from "../entity/Legenda";
import { XML } from "../entity/Xml";

@JsonController()
export class XMLController {

    legendaRepository = getRepository(Legenda);
    xmlRepository = getRepository(XML);

    @Post("/xml")
    async saveFile(@UploadedFile("fileName") file: any) {
        console.log("file");

        try {

            // Converte o Buffer para uma String/XML
            let xmlOrigin = Buffer.from(file.buffer).toString();

            // Importar xml de entrada e converte para json
            let json = await parser.toJson(xmlOrigin);
            json = JSON.parse(json);

            //Insert json to XML TABLE
            const xml: XML = new XML();

            //load Cod Prestador
            let codPrestador = json["ans:mensagemTISS"]["ans:cabecalho"]["ans:origem"]["ans:identificacaoPrestador"]["ans:codigoPrestadorNaOperadora"];

            //Create object file
            xml.dataImportacao = new Date();
            xml.prestador = codPrestador;
            xml.xml = xmlOrigin;

            //Save on database
            await this.xmlRepository.save(xml);

            //Carrega a tabela de preço 
            let ultTabelaPreco = await this.legendaRepository
                .createQueryBuilder("leg")
                .innerJoinAndSelect("leg.tabelaPreco", "tab")
                .where("leg.prestador = :prestador")
                .orderBy("tab.dataVigencia", "DESC")
                .take(1)
                .setParameters({ prestador: codPrestador })
                .getOne();

            //Pega a penúltima tabela de preço
            let PenultTabelaPreco = await this.legendaRepository
                .createQueryBuilder("leg")
                .innerJoinAndSelect("leg.tabelaPreco", "tab")
                .where("leg.prestador = :prestador")
                .orderBy("tab.dataVigencia", "DESC")
                .skip(1)
                .take(1)
                .setParameters({ prestador: codPrestador })
                .getOne();

            //Validacoes do Xml

            //Gera novo XML com as informações contidas

        } catch (ex) {
            console.log(ex.message);
            return "Houve um erro ao processar o XML: " + ex
        }
    }

    bufferFromBufferString(bufferStr) {
        return Buffer.from(
            bufferStr
                .replace(/[<>]/g, '') // remove < > symbols from str
                .split(' ') // create an array splitting it by space
                .slice(1) // remove Buffer word from an array
                .reduce((acc, val) =>
                    acc.concat(parseInt(val, 16)), [])  // convert all strings of numbers to hex numbers
        )
    }
}
