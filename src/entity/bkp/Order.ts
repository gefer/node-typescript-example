import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Table } from "typeorm";
import { Item } from "./Item";

@Entity("pedidos")
export class Order {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: "valor_total",
        type: "decimal",
        precision: 18,
        scale: 4
    })
    totalValue: number;

    @Column({
        name: "valor_produtos",
        type: "decimal",
        precision: 18,
        scale: 4
    })
    productValue: number;

    @Column({
        length: 100,
        name: "obs_pedido"
    })
    description: String

    @OneToMany((type) => Item, (item) => item.order)
    public itens: Item[];

}
