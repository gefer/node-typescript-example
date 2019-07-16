import { Product } from "../entity/Product";
import { JsonController, Param, Body, Get, Post, Put, Delete } from "routing-controllers";
import { getRepository } from "typeorm";

@JsonController()
export class ProductController {

    productRepository = getRepository(Product);

    @Get("/products")
    getAll() {
        return this.productRepository.find();
    }

    @Get("/products/:id")
    getOne(@Param("id") id: number) {
        return this.productRepository.findOne(id);
    }

    @Post("/products")
    post(@Body() p: Product) {
        this.productRepository.save(p);
    }

    @Put("/products/:id")
    put(@Param("id") id: number, @Body() user: any) {

        //Pode usar o método save tanto para inserir quanto para atualizar 
        //ORM verifica se já existe e se existir, atualiza o objeto
        this.productRepository.save(user);
    }

    @Delete("/users/:id")
    remove(@Param("id") id: number) {
        this.productRepository.delete(id);
    }

}