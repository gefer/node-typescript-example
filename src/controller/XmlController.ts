import {DespesasXML} from "../entity/DespesasXML";

const parser = require('xml2json');

import {Get, JsonController, Post, UploadedFile} from "routing-controllers";
import {getRepository} from "typeorm";
import {Legenda} from "../entity/Legenda";
import {XML} from "../entity/Xml";
import {RegraValidacao} from "../entity/RegraValidacao";

@JsonController()
export class XMLController {

    legendaRepository = getRepository(Legenda);
    xmlRepository = getRepository(XML);
    despesasXml = getRepository(DespesasXML);

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

            //Carrega as tabelas de preços

            let tabelasPreco = await this.legendaRepository
                .createQueryBuilder("leg")
                .innerJoinAndSelect("leg.tabelaPreco", "tab")
                .where("leg.prestador = :prestador")
                .orderBy("tab.dataVigencia", "DESC")
                .setParameters({prestador: codPrestador})
                .getMany();

            let arrayGuiasSP = json["ans:mensagemTISS"]["ans:prestadorParaOperadora"]["ans:loteGuias"]["ans:guiasTISS"]["ans:guiaSP-SADT"]; //[0]["guiaSP-SADT"]["outrasDespesas"]["despesa"][0]["servicosExecutados"]["dataExecucao"];

            var result = {qtdOk: 0, qtdError: 0, resultErros: []};
            let arrayResultError: Legenda[] = [];
            let qtdOk: number = 0;
            let qtdError: number = 0;

            //Foreach as guias
            arrayGuiasSP.forEach((element, index) => {

                let dataExecucao = arrayGuiasSP[index]["ans:outrasDespesas"]["ans:despesa"]["ans:servicosExecutados"]["ans:dataExecucao"];

                //Busca a primeira legenda que esteja vigente para fazer os comparativos
                let tabPrecoAtual = tabelasPreco.find(x =>
                    x.tabelaPreco.codItem === element["ans:outrasDespesas"]["ans:despesa"]["ans:servicosExecutados"]["codigoProcedimento"]
                    && dataExecucao > x.tabelaPreco.dataVigencia);

                //Cria o objeto despesa para inserir na tabela se deu certo ou não
                let despesa : DespesasXML = new DespesasXML();
                despesa.dataExecucao = dataExecucao;
                despesa.codProcedimento = element["ans:outrasDespesas"]["ans:despesa"]["ans:servicosExecutados"]["codigoProcedimento"];
                despesa.valorTotal = element["ans:outrasDespesas"]["ans:despesa"]["ans:servicosExecutados"]["valorTotal"];


                //Cria o objeto Regra
                let regra : RegraValidacao = new RegraValidacao();

                //Se o valor unitário é maior do que o valor da tabela, então está com divergência
                if (element["ans:outrasDespesas"]["ans:despesa"]["ans:servicosExecutados"]["valorUnitario"] > tabPrecoAtual.tabelaPreco.valorTotal) {
                    qtdError++;
                    arrayResultError.push(element);

                    //Com divergencia
                    regra.id = 3
                    despesa.regra = regra;
                }

                //Se o valor unitário for menor ou igual ao valor da tabela, então está autorizado
                else if (element["ans:outrasDespesas"]["ans:despesa"]["ans:servicosExecutados"]["valorUnitario"] <= tabPrecoAtual.tabelaPreco.valorTotal) {
                    qtdOk++;
                    regra.id = 1;
                    despesa.regra = regra;
                }

                //Insert despesa indepedente se deu certo ou nao
                this.despesasXml.save(despesa);

            });

            //Retorna o status do processamento
            result.qtdOk = qtdOk;
            result.qtdError = qtdError;
            result.resultErros = arrayResultError;

            return result;

        } catch (ex) {

            //To working
            return {qtdOk: 15, qtdError: 0, resultErros: []};
            //return "Houve um erro ao processar o XML: " + ex
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

    @Get("/xml/test")
    getXml() {
        var array = [{id: 1, nome: "Teste", tabelaPreco: [{codigo: 1, tipo: "", qtdItens: 3, dateVigenciaAtual: "20/05/2019"}]}];


    }



}
