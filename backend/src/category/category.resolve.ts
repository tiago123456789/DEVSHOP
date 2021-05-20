import { Query, Resolver } from "@nestjs/graphql";
import { CategoryDto } from "./category.dto";


@Resolver(of => CategoryDto)
export class CategoryResolve {

    @Query(returns => [CategoryDto])
    public getCategories(): CategoryDto[] {
        return [
            new CategoryDto(),
            new CategoryDto()
        ]
    }
}