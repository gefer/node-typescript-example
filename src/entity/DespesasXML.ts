import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, ManyToOne } from "typeorm";
import { RegraValidacao } from "./RegraValidacao";

@Entity()
export class DespesasXML {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ type: 'date' })
    dataExecucao: Date;

    @Column()
    codProcedimento: string;

    @Column({
        name: "valor_total",
        type: "decimal",
        precision: 18,
        scale: 4
    })
    valorTotal: number;

    @ManyToOne(type => RegraValidacao, regravalidacao => regravalidacao.despesasXML)
    regra: RegraValidacao;

}
