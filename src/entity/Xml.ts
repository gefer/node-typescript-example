import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, PrimaryColumn } from "typeorm";
import { Prestador } from "./Prestador";

@Entity()
export class XML {
    
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Prestador, Prestador => Prestador.codPrestador)
    @JoinColumn({ name: "codPrestador" })
    public prestador: Prestador;

    @CreateDateColumn({type:'date'})
    dataVigencia: Date;

    @Column({type: 'xml'})
    xml: string;
}
