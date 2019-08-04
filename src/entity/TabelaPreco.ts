import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, PrimaryColumn, OneToMany } from "typeorm";
import { Legenda } from "./Legenda";

@Entity()
export class TabelaPreco {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tipoProcesso: string;

    @Column()
    codItem: number;

    @Column()
    descItem: string;

    @Column()
    codTabela: string;

    @Column({
        name: "valorTotal",
        type: "decimal",
        precision: 18,
        scale: 4
    })
    valorTotal: number;

    @CreateDateColumn({ type: 'date' })
    dataVigencia: Date;

    @Column({
        nullable: true
    })
    unidMedida: string;

    @Column({
        name: "valorFilme",
        type: "decimal",
        precision: 18,
        scale: 4,
        nullable: true
    })
    valorFilme: number;

    @OneToMany(type => Legenda, legenda => legenda.tabelaPreco)
    legendas: Legenda[];
}
