import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UserDto } from "./user.dto";
import { UserService } from "./user.service";

@Resolver(of => UserDto)
export class CategoryResolve {

    constructor(private userService: UserService) {}

    // @Mutation(returns => Boolean)
    // async updateCategory(@Args("input") input: UpdateCategoryInputDto): Promise<Boolean> {
    //     await this.categoryService.update(input);
    //     return true;
    // }


    // @Mutation(returns => CategoryDto)
    // async createCategory(@Args("input") input: CategoryInputDto): Promise<CategoryDto> {
    //     const entity: Category = new Category();
    //     entity.name = input.name;
    //     entity.slug = input.slug;
    //     return await this.categoryService.create(entity);
    // }

    // @Mutation(returns => Boolean)
    // async deleteCategory(@Args("id") id: string): Promise<boolean> {
    //     await this.categoryService.remove(id);
    //     return true;
    // }


    // @Query(returns => [CategoryDto])
    // public async getCategories(): Promise<CategoryDto[]> {
    //     const categories = await this.categoryService.getAll();
    //     return categories
    // }

    // @Query(returns => CategoryDto)
    // public async getCategoryById(@Args("id") id: string): Promise<CategoryDto> {
    //     const category = await this.categoryService.getById(id);
    //     return new CategoryDto(
    //         category.id,
    //         // @ts-ignore
    //         category.name,
    //         category.slug
    //     )
    // }
}