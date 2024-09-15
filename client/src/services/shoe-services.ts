import axiosClient from "@/services/index.ts";
import {CreateShoeType, ShoeAPIType} from "@/types/shoe-types.ts";

enum ShoeRoutes {
    INDEX = '/shoes'
}

export const getAllShoes = async (signal: AbortSignal) => {
    const {data} = await axiosClient.get<ShoeAPIType[]>(`${ShoeRoutes.INDEX}`, {signal});

    return data;
};

export const createShoe = async (shoe: CreateShoeType) => {
    const {data} = await axiosClient.post(`${ShoeRoutes.INDEX}`, {...shoe});
    return data;
};