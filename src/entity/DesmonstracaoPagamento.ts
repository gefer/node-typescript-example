import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";
import { TabelaPreco } from "./TabelaPreco";
import { Prestador } from "./Prestador";

@Entity()
export class DemonstracaoPagamento {

    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToOne(type => Prestador, Prestador => Prestador.codPrestador)
    @JoinColumn({ name: "codPrestador" })
    public prestador: Prestador;

    @Column()
    executante: string;

    @ManyToOne(type => TabelaPreco, TabelaPreco => TabelaPreco.codItem)
    @JoinColumn({ name: "codItem" })
    public tabelaPreco: TabelaPreco;

    
    @CreateDateColumn({type:'date'})
    dataAtendimento: Date;

    @Column()
    quantidade: number;

    @Column({
        name: "valorPago",
        type: "decimal",
        precision: 18,
        scale: 4
    })
    valorPago: number;
    
    @Column()
    tipoGuia: string;

    @Column()
    tipoPlano: string;
    
}