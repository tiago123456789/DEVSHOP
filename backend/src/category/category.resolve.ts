import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CategoryDto } from "./dto/category.dto";
import { Category } from "./category.entity";
import { CategoryService } from "./category.service";
import { CategoryInputDto } from "./dto/category-input.dto";
import { UpdateCategoryInputDto } from "./dto/update-category-input.dto";
import { UseGuards } from "@nestjs/common";
import { AuthorizationGuard } from "src/commom/security/authorization.security";
import { Roles } from "src/commom/decorators/role.decoretor";

@Resolver(of => CategoryDto)
export class CategoryResolve {

    constructor(private categoryService: CategoryService) {}
    
    @UseGuards(AuthorizationGuard)
    @Roles("ADMIN")
    @Mutation(returns => Boolean)
    async updateCategory(@Args("input") input: UpdateCategoryInputDto): Promise<Boolean> {
        await this.categoryService.update(input);
        return true;
    }

    @UseGuards(AuthorizationGuard)
    @Roles("ADMIN")
    @Mutation(returns => CategoryDto)
    async createCategory(@Args("input") input: CategoryInputDto): Promise<CategoryDto> {
        const entity: Category = new Category();
        entity.name = input.name;
        entity.slug = input.slug;
        return await this.categoryService.create(entity);
    }

    @UseGuards(AuthorizationGuard)
    @Roles("ADMIN")
    @Mutation(returns => Boolean)
    async deleteCategory(@Args("id") id: string): Promise<boolean> {
        await this.categoryService.remove(id);
        return true;
    }

    @UseGuards(AuthorizationGuard)
    @Roles("ADMIN")
    @Query(returns => [CategoryDto])
    public async getCategories(): Promise<CategoryDto[]> {
        const categories = await this.categoryService.getAll();
        return categories
    }

    @UseGuards(AuthorizationGuard)
    @Roles("ADMIN")
    @Query(returns => CategoryDto)
    public async getCategoryById(@Args("id") id: string): Promise<CategoryDto> {
        const category = await this.categoryService.getById(id);
        return new CategoryDto(
            category.id,
            // @ts-ignore
            category.name,
            category.slug
        )
    }
}