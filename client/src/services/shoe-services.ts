import axiosClient from "@/services/index.ts";
import {
    ShoeAPIType,
    CreateShoeType, ShoeWithCategoriesType, UpdateShoeType
} from "@/types/shoe-types.ts";

enum ShoeRoutes {
    INDEX = '/shoes'
}

export const getAllShoes = async (signal: AbortSignal, lastShoeId?: number) => {
    const {data} = await axiosClient.get<ShoeAPIType[]>(`${ShoeRoutes.INDEX}`, {
        signal,
        params: {
            lastShoeId
        }
    });

    return data;
};

export const getShoeById = async (shoeId: number, signal: AbortSignal) => {
    const {data} = await axiosClient.get<ShoeWithCategoriesType>(`${ShoeRoutes.INDEX}/${shoeId}`, {signal});
    return data;
};

export const createShoe = async (shoe: CreateShoeType) => {
    const {data} = await axiosClient.post(`${ShoeRoutes.INDEX}`, {...shoe},);
    return data;
};

export const updateShoe = async (shoe: UpdateShoeType) => {
    const {data} = await axiosClient.put(`${ShoeRoutes.INDEX}/${shoe.shoeId}`, {
        name: shoe.name,
        picture: shoe.picture,
        description: shoe.description,
        categories: shoe.categories
    });
    return data;
};

export const deleteShoe = async (shoeId: number) => {
    await axiosClient.delete(`${ShoeRoutes.INDEX}/${shoeId}`);
};