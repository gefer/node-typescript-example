import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { TabelaPreco } from "./tabelaPreco";
import { Prestador } from "./Prestador";

@Entity()
export class Legenda {

    @ManyToOne(type => TabelaPreco, TabelaPreco => TabelaPreco.codTabela)
    @JoinColumn({ name: "codTabela" })
    public tabelaPreco: TabelaPreco;

    @ManyToOne(type => Prestador, Prestador => Prestador.codPrestador)
    @JoinColumn({ name: "codPrestador" })
    public prestador: Prestador;

    @Column()
    codPrestador: number;

    @Column()
    codTabela: number;

    @Column()
    tipoPlano: string;
    
    @Column()
    tipoServico: string;

    @Column()
    tipoCobranca: string;
    
}
