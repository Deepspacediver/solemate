export type ShoeType = {
    shoeId: number,
    name: string,
    picture: string,
    description: string,
}

export type ShoeAPIType = { shoe_id: number } & Omit<ShoeType, 'shoeId'>

export type CreateShoeType = {
    name: string,
    description: string,
    picture: string,
    categories: number[]
}