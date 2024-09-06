export type CategoryType = {
    name: string,
    picture: string,
    description?: string
    categoryId: number
}

export type CategoryAPIType = Omit<CategoryType, 'categoryId'> & {
    category_id: number
}

export type CreateCategoryType = Pick<CategoryType, 'name' | 'description' | 'picture'>