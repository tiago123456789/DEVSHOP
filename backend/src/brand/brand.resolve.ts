import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { BrandDto } from "./dto/brand.dto";
import { BrandService } from "./brand.service";
import { BrandInputDto } from "./dto/brand-input.dto";
import { FileUpload } from "graphql-upload"
import { GraphQLUpload } from "apollo-server-express"

@Resolver(of => BrandDto)
export class BrandResolve {

    constructor(private brandService: BrandService) {}

    @Mutation(returns => Boolean)
    async updateLogoBrand(
        @Args("id") id: string, 
        @Args("file") file: string 
    ): Promise<Boolean> {
        // const { createReadStream, filename, mimetype } = await file;
        await this.brandService.uploadLogoBrand(id, id, file);
        return true;
    }

    @Mutation(returns => Boolean)
    async updateBrand(@Args("input") input: BrandInputDto): Promise<Boolean> {
        await this.brandService.update(input.id, input);
        return true;
    }

    @Mutation(returns => String)
    async createBrand(@Args("input") input: BrandInputDto): Promise<string> {
        const brand = await this.brandService.create(input);
        return brand.id;
    }

    @Mutation(returns => Boolean)
    async deleteBrand(@Args("id") id: string): Promise<boolean> {
        await this.brandService.remove(id);
        return true;
    }


    @Query(returns => [BrandDto])
    public async getBrands(): Promise<BrandDto[]> {
        return await this.brandService.getAll();
    }

    @Query(returns => BrandDto)
    public async getBrandById(@Args("id") id: string): Promise<BrandDto> {
       const brand =  await this.brandService.getById(id);
       return brand;
    }

    // @Query(returns => String)
    // public async testStorage(): Promise<string> {
    //    return await this.brandService.testStorage();
    // }
}