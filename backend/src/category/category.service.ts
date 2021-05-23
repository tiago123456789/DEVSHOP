import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CategoryDto } from "./dto/category.dto";
import { Category } from "./category.entity";

@Injectable()
export class CategoryService {
    
    constructor(
        @InjectRepository(Category) private categoryRepository: Repository<Category>) {
    }

    getById(id: string): Promise<Category> {
        return this.categoryRepository.findOne(id);
    }

    async remove(id: string) {
        return this.categoryRepository.delete(id);
    }

    update(register: Category) {
        return this.categoryRepository.update(register.id, {
            name: register.name,
            slug: register.slug
        })
    }

    async create(register: Category) {
        const entityCreated = await this.categoryRepository.save(register);
        // @ts-ignore
        return new CategoryDto(entityCreated.id, entityCreated.name, entityCreated.slug);
    }

    async getAll(): Promise<CategoryDto[]> {
        const register = await this.categoryRepository.find({});
        return register.map((item: Category) => {
            // @ts-ignore
            return new CategoryDto(item.id, item.name, item.slug);
        })
    }
}