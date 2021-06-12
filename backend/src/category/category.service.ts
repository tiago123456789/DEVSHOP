import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CategoryDto } from "./dto/category.dto";
import { Category } from "./category.entity";
import { DataInvalidException } from "src/commom/exceptions/data-invalid.exception";

@Injectable()
export class CategoryService {

    constructor(
        @InjectRepository(Category) private categoryRepository: Repository<Category>) {
    }

    private findBySlug(slug: string) {
        return this.categoryRepository.findOne({ slug: slug });
    }

    getById(id: string): Promise<Category> {
        return this.categoryRepository.findOne(id);
    }

    async remove(id: string) {
        return this.categoryRepository.delete(id);
    }

    async update(register: Category) {
        // @ts-ignore
        const registerWithSlug = await this.findBySlug(register.slug);
        if (registerWithSlug && register.id != registerWithSlug.id) {
            throw new DataInvalidException("Slug already used! Used another slug.")
        }
        return this.categoryRepository.update(register.id, {
            name: register.name,
            slug: register.slug
        })
    }

    async create(register: Category) {
        // @ts-ignore
        const registerWithSlug = await this.findBySlug(register.slug);
        if (registerWithSlug) {
            throw new DataInvalidException("Slug already used! Used another slug.")
        }

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