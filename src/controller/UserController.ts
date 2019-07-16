import { User } from "../entity/User";
import { JsonController, Param, Body, Get, Post, Put, Delete } from "routing-controllers";
import { getRepository } from "typeorm";

@JsonController()
export class UserController {

    userRepository = getRepository(User);

    @Get("/users")
    getAll() {
        return this.userRepository.find();
    }

    @Get("/users/:id")
    getOne(@Param("id") id: number) {
        return this.userRepository.findOne(id);
    }

    @Post("/users")
    post(@Body() user: User) {
        this.userRepository.save(user);
    }

    @Put("/users/:id")
    put(@Param("id") id: number, @Body() user: any) {
    }

    @Delete("/users/:id")
    remove(@Param("id") id: number) {
    }

}