import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { ProductInputDto } from "./dto/product-input.dto";
import { UpdateProductInputDto } from "./dto/update-product-input.dto";
import { Product } from "./product.entity";
import { ProductService } from "./product.service";

@Resolver(of => Product)
export class ProductResolver {

    constructor(private productService: ProductService) {}

    @Query(returns => [Product]) 
    public async getProducts(): Promise<Product[]> {
        const products = await this.productService.getAll();
        return products;
    }

    @Mutation(returns => Boolean) 
    public async createProduct(@Args("input") input: ProductInputDto): Promise<Boolean> {
        await this.productService.create(input);
        return true;
    }

    @Mutation(returns => Boolean) 
    public async updateProduct(@Args("input") input: UpdateProductInputDto): Promise<Boolean> {
        await this.productService.update(input.id, input);
        return true;
    }

    @Mutation(returns => Boolean) 
    public async deleteProduct(@Args("id") id: string): Promise<Boolean> {
        await this.productService.remove(id);
        return true;
    }


    @Query(returns => Product) 
    public async getByIdProduct(@Args("id") id: string): Promise<Product> {
        return await this.productService.getById(id);
    }
}