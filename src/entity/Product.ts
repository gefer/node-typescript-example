import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Item } from "./Item";

@Entity("produtos")
export class Product {

    @PrimaryGeneratedColumn({ name: "id" })
    id: number;

    @Column({
        length: 100,
        name: "nome"
    })
    name: string;

    @Column({
        length: 200,
        name: "descricao"
    })
    description: string;

    @Column({
        name: "preco",
        type: "decimal",
        precision: 18,
        scale: 4
    })
    price: number;

    @Column({
        name: "quantidade_estoque",
        type: "decimal",
        precision: 18,
        scale: 4
    })
    stockQuantity: number

    @OneToMany((type) => Item, (item) => item.product)
    public itens: Item[];

}
