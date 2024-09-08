export type ShoeType = {
    shoeId: number,
    name: string,
    picture: string,
    description: string,
}

export type ShoeAPIType = { shoe_id: number } & Omit<ShoeType, 'shoeId'>