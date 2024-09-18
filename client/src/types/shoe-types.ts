import {CategoryOption} from "@/types/category-types.ts";

export type ShoeType = {
    shoeId: number,
    name: string,
    picture: string,
    description: string,
}

export type ShoeAPIType = { shoe_id: number } & Omit<ShoeType, 'shoeId'>


export type ShoeWithCategoriesType = {
    name: string,
    description: string,
    picture: string,
    categories: CategoryOption[]
}

export type CreateShoeType = Omit<ShoeWithCategoriesType, 'categories'> & {
    categories: number[]
}

export type UpdateShoeType = CreateShoeType & {
    shoeId: number
}
