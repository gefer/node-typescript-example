import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Legenda } from "./Legenda";
import { XML } from "./Xml";
import { DemonstracaoPagamento } from "./DesmonstracaoPagamento";

@Entity()
export class Prestador {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    codPrestador: number;

    @Column()
    nomePrestador: string;

    @Column()
    tipoPrestador: string;

    @OneToMany(type => Legenda, legenda => legenda.prestador)
    legendas: Legenda[];

    @OneToMany(type => XML, xml => xml.prestador)
    xmls: XML[];

    @OneToMany(type => DemonstracaoPagamento, demo => demo.prestador)
    demonstracoes: DemonstracaoPagamento[];

}
