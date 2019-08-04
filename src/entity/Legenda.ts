import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { TabelaPreco } from "./TabelaPreco";
import { Prestador } from "./Prestador";

@Entity()
export class Legenda {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => TabelaPreco, tabpreco => tabpreco.legendas)
    public tabelaPreco: TabelaPreco;

    @ManyToOne(type => Prestador, prestador => prestador.legendas)
    public prestador: Prestador;

    @Column()
    tipoPlano: string;
    
    @Column()
    tipoServico: string;

    @Column({
        name: "percentual_taxa",
        type: "decimal",
        precision: 18,
        scale: 4
    })
    percentualTaxa: number;

    @Column()
    tipoCobranca: string;
    
}
