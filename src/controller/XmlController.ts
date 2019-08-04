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

            // Importar xml de entrada e converte para json
            let json = await parser.toJson(Buffer.from(file.buffer));
            json = JSON.parse(json);

            //Insert json to XML TABLE
            const xml: XML = new XML();

            //load Cod Prestador
            let codPrestador = json.cabecalho.origem.identificacaoPrestador.codigoPrestadorNaOperadora;

            //Create object file
            xml.dataImportacao = new Date();
            xml.prestador = codPrestador;

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

            // Verifica data de vigência para comparar o xml com o preço da tabela
            // A data de vigência do xml do fornecedor deve ser maior do que a data de vigência da tabela de preço
            let dataExecucao = json["prestadorParaOperadora"]["loteGuias"]["guiaTiss"][0]["guiaSP-SADT"]["outrasDespesas"]["despesa"][0]["servicosExecutados"]["dataExecucao"];

           // if (dataExecucao > ultTabelaPreco.dataVigencia) { 

          //  }

          //  let codigoDespesa = json["ans:prestadorParaOperadora"]["loteGuias"]["guiaTiss"][0]["guiaSP-SADT"]["outrasDespesas"]["despesa"][0]["codigodespesa"];

            // Tabela.DataVigencia => 
            // Comparar TabelaPreco.codItem = codProcedimento

            //if encontrou validar o preço
            //so gravar o codigo da regra na tabela regras

            //valorUnitario
            // let valorUnitario = json.prestadorParaOperadora.loteGuias.guiaTiss[i].guiaSP-SADT.outrasDespesas.despesa[i].servicosExecutados.valorUnitario;


            //Gera novo XML com as informações contidas

        } catch (ex) {

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
