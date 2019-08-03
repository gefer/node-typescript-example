import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Prestador {

    @PrimaryColumn()
    codPrestador: number;

    @Column()
    nomePrestador: string;

    @Column()
    tipoPrestador: string;

}
