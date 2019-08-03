import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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

}
