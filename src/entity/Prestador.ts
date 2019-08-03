import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Prestador {

    @Column()
    codPrestador: number;

    @Column()
    nomePrestador: string;

    @Column()
    tipoPrestador: string;

}
