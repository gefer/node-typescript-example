import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, PrimaryColumn } from "typeorm";

@Entity()
export class TabelaPreco {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tipoProcesso: string;

    @Column()
    codItem: number;

    @Column()
    descItem: string;
    
    @PrimaryColumn()
    codTabela: string;
    
    @Column({
        name: "valorTotal",
        type: "decimal",
        precision: 18,
        scale: 4
    })
    valorTotal: number;

    @CreateDateColumn({type:'date'})
    dataVigencia: Date;
    
    @Column()
    unidMedida: string;

    @Column({
        name: "valorFilme",
        type: "decimal",
        precision: 18,
        scale: 4
    })
    valorFilme: number;

}
