import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";
import { TabelaPreco } from "./TabelaPreco";
import { Prestador } from "./Prestador";

@Entity()
export class DemonstracaoPagamento {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    executante: string;

    @CreateDateColumn({ type: 'date' })
    dataAtendimento: Date;

    @Column()
    quantidade: number;

    @Column({
        name: "valor_pago",
        type: "decimal",
        precision: 18,
        scale: 4
    })
    valorPago: number;

    @Column()
    tipoGuia: string;

    @Column()
    tipoPlano: string;

    @ManyToOne(type => Prestador, prestador => prestador.demonstracoes)
    public prestador: Prestador;

}