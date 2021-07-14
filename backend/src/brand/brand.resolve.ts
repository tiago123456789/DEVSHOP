import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { BrandDto } from "./dto/brand.dto";
import { BrandService } from "./brand.service";
import { BrandInputDto } from "./dto/brand-input.dto";
import { UseGuards } from "@nestjs/common";
import { Roles } from "src/commom/decorators/role.decoretor";
import { AuthorizationGuard } from "src/commom/security/authorization.security";

@Resolver(of => BrandDto)
export class BrandResolve {

    constructor(private brandService: BrandService) {}

    @UseGuards(AuthorizationGuard)
    @Roles("ADMIN")
    @Mutation(returns => Boolean)
    async updateLogoBrand(
        @Args("id") id: string, 
        @Args("file") file: string 
    ): Promise<Boolean> {
        await this.brandService.uploadLogoBrand(id, id, file);
        return true;
    }

    @UseGuards(AuthorizationGuard)
    @Roles("ADMIN")
    @Mutation(returns => Boolean)
    async updateBrand(@Args("input") input: BrandInputDto): Promise<Boolean> {
        await this.brandService.update(input.id, input);
        return true;
    }

    @UseGuards(AuthorizationGuard)
    @Roles("ADMIN")
    @Mutation(returns => String)
    async createBrand(@Args("input") input: BrandInputDto): Promise<string> {
        const brand = await this.brandService.create(input);
        return brand.id;
    }

    @UseGuards(AuthorizationGuard)
    @Roles("ADMIN")
    @Mutation(returns => Boolean)
    async deleteBrand(@Args("id") id: string): Promise<boolean> {
        await this.brandService.remove(id);
        return true;
    }

    @UseGuards(AuthorizationGuard)
    @Roles("ADMIN")
    @Query(returns => [BrandDto])
    public async getBrands(): Promise<BrandDto[]> {
        return await this.brandService.getAll();
    }

    @UseGuards(AuthorizationGuard)
    @Roles("ADMIN")
    @Query(returns => BrandDto)
    public async getBrandById(@Args("id") id: string): Promise<BrandDto> {
       const brand =  await this.brandService.getById(id);
       return brand;
    }

}