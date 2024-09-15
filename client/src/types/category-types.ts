import {ShoeAPIType} from "@/types/shoe-types.ts";

export type CategoryType = {
    name: string,
    picture: string,
    description: string
    categoryId: number
}

export type CategoryAPIType = Omit<CategoryType, 'categoryId'> & {
    category_id: number
}

export type CreateCategoryType = Pick<CategoryType, 'name' | 'description' | 'picture'>

export type CategoryWithShoesAPIType = {
    category: CategoryAPIType,
    shoes: ShoeAPIType[]
}

export type CategoryOption = {
    categoryId: number,
    name: string,
}