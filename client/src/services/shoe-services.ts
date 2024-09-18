import axiosClient from "@/services/index.ts";
import {ShoeWithCategoriesType, ShoeAPIType} from "@/types/shoe-types.ts";

enum ShoeRoutes {
    INDEX = '/shoes'
}

export const getAllShoes = async (signal: AbortSignal) => {
    const {data} = await axiosClient.get<ShoeAPIType[]>(`${ShoeRoutes.INDEX}`, {signal});

    return data;
};

export const getShoeById = async (shoeId: number, signal: AbortSignal) => {
    const {data} = await axiosClient.get(`${ShoeRoutes.INDEX}/${shoeId}`, {signal});
    return data;
};

export const createShoe = async (shoe: ShoeWithCategoriesType) => {
    const {data} = await axiosClient.post(`${ShoeRoutes.INDEX}`, {...shoe});
    return data;
};