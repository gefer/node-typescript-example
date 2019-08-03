import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class TabelaPreco {

    @Column()
    tipoProcesso: string;

    @Column()
    codItem: number;

    @Column()
    descItem: string;
    
    @Column()
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
    static codTabela: any;
    
}
