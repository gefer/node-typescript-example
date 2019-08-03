import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { TabelaPreco } from "./tabelaPreco";
import { Prestador } from "./Prestador";

@Entity()
export class Legenda {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => TabelaPreco, TabelaPreco => TabelaPreco.codTabela)
    @JoinColumn({ name: "codTabela" })
    public tabelaPreco: TabelaPreco;

    @ManyToOne(type => Prestador, Prestador => Prestador.codPrestador)
    @JoinColumn({ name: "codPrestador" })
    public prestador: Prestador;

    @Column()
    tipoPlano: string;
    
    @Column()
    tipoServico: string;

    @Column({
        name: "percentualTaxa",
        type: "decimal",
        precision: 18,
        scale: 4
    })
    percentualTaxa: number;

    @Column()
    tipoCobranca: string;
    
}
