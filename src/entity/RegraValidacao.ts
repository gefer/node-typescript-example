import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { DespesasXML } from "./DespesasXML";

@Entity()
export class RegraValidacao {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(type => DespesasXML, despesasxml => despesasxml.regra)
    despesasXML: DespesasXML[];

    @Column()
    condicao: string;
    
    @Column()
    descricao: string;

    @Column()
    status: string;
    
}
