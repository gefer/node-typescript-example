import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, PrimaryColumn } from "typeorm";
import { Prestador } from "./Prestador";

@Entity()
export class XML {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Prestador, prestador => prestador.xmls)
    public prestador: Prestador;

    @CreateDateColumn({type:'date'})
    dataImportacao: Date;

    @Column({type: 'xml'})
    xml: string;
}
