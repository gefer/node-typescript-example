import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class Log {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    codTabela: number;
    
    @Column()
    tipoProcesso: string;

    @Column({
        name: "percentual_taxa",
        type: "decimal",
        precision: 18,
        scale: 4
    })
    percentualTaxa: number;

    @Column()
    negociacao: string;

    @CreateDateColumn({ type: 'date' })
    dataNegociacao: Date;
}
