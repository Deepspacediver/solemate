export type CategoryType = {
    name: string,
    picture: string,
    description?: string
    category_id: number
}

export type CreateCategoryType = Pick<CategoryType, 'name' | 'description' | 'picture'>