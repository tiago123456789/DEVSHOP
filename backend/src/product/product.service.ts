import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UpdateProductInputDto } from "./dto/update-product-input.dto";
import { Product } from "./product.entity";

@Injectable()
export class ProductService {

    constructor(@InjectRepository(Product) private repository: Repository<Product>) {}

    update(id: string, dataModified: UpdateProductInputDto) {
        return this.repository.update(id, {
            name: dataModified.name,
            description: dataModified.description,
            slug: dataModified.slug
        });
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

    create(product: Product) {
        return this.repository.save(product);
    }

}