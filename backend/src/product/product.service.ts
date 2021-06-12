import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataInvalidException } from "src/commom/exceptions/data-invalid.exception";
import { Repository } from "typeorm";
import { UpdateProductInputDto } from "./dto/update-product-input.dto";
import { Product } from "./product.entity";

@Injectable()
export class ProductService {

    constructor(@InjectRepository(Product) private repository: Repository<Product>) {}

    async update(id: string, dataModified: UpdateProductInputDto) {
        const registerWithSlug = await this.findBySlug(dataModified.slug);
        // @ts-ignore
        if (registerWithSlug && id != registerWithSlug.id) {
            throw new DataInvalidException("Slug already used! Used another slug.")
        }

        return this.repository.update(id, {
            name: dataModified.name,
            description: dataModified.description,
            slug: dataModified.slug
        });
    }

    private findBySlug(slug: String) {
        return this.repository.findOne({ slug: slug });
    }

    remove(id: string) {
        return this.repository.delete(id);
    }

    getById(id: string) {
        return this.repository.findOne(id);
    }


    getAll() {
        return this.repository.find({});
    }

    async create(product: Product) {
        const productWithSlug = await this.findBySlug(product.slug);
        if (productWithSlug) {
            throw new DataInvalidException("Slug already used! Used another slug.")
        }
        return this.repository.save(product);
    }

}