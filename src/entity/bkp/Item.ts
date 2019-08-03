import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, TableForeignKey, Table } from "typeorm";
import { Product } from "./Product";
import { Order } from "./Order";

@Entity("pedidos_itens")
export class Item {

    public productId: number;
    public orderId: number;

    @ManyToOne(type => Product, product => product.itens)
    @JoinColumn({ name: "product_id" })
    public product: Product;

    @ManyToOne(type => Order, order => order.itens)
    @JoinColumn({ name: "order_id" })
    public order: Order;

    @Column()
    @PrimaryGeneratedColumn()
    item: number;

    @Column({
        name: "quantidade",
        type: "decimal",
        precision: 18,
        scale: 4
    })
    quantity: number;

    @Column({
        name: "valor_unitario",
        type: "decimal",
        precision: 18,
        scale: 4
    })
    unitValue: number;

    @Column({
        name: "valor_total",
        type: "decimal",
        precision: 18,
        scale: 4
    })
    totalValue: number;

}
