import axiosClient from "@/services/index.ts";
import {
    CategoryAPIType,
    CategoryType,
    CategoryWithShoesAPIType,
    CreateCategoryType
} from "@/types/category-types.ts";
import {ShoeAPIType} from "@/types/shoe-types.ts";

enum CategoryRoutes {
    CATEGORIES = "/categories",
    WITHOUT_CATEGORY = '/categoryless/list',
    WITH_SHOES = '/category-with-shoes',
    CATEGORY_DATA = '/category-data',
}

export const getAllCategories = async (signal: AbortSignal) => {
    const {data} = await axiosClient.get<CategoryAPIType[]>(CategoryRoutes.CATEGORIES, {signal});
    return data;
};

export const getCategory = async (categoryId: number, signal: AbortSignal) => {
    const {data} = await axiosClient.get(`${CategoryRoutes.CATEGORIES}${CategoryRoutes.CATEGORY_DATA}/${categoryId}`, {signal});
    return data;
};

export const createCategory = async ({
                                         name,
                                         picture,
                                         description
                                     }: CreateCategoryType) => {
    const {data} = await axiosClient.post(`${CategoryRoutes.CATEGORIES}/category/add`, {
        name,
        picture,
        description
    });
    return data;
};

export const updateCategory = async ({
                                         name,
                                         picture,
                                         description,
                                         categoryId
                                     }: CategoryType) => {
    const {data} = await axiosClient.put(`${CategoryRoutes.CATEGORIES}/${categoryId}`, {
        name,
        picture,
        description,

    });

    return data;
};

export const getCategoryItemsById = async (categoryId: number, signal: AbortSignal) => {
    const {data} = await axiosClient.get<ShoeAPIType[]>(`${CategoryRoutes.CATEGORIES}/${categoryId}`, {signal});
    return data;
};

export const getItemsWithoutCategory = async () => {
    const {data} = await axiosClient.get(`$${CategoryRoutes.CATEGORIES}/${CategoryRoutes.WITHOUT_CATEGORY}`);
    return data;
};

export const deleteCategory = async (categoryId: number) => {
    const {data} = await axiosClient.delete(`${CategoryRoutes.CATEGORIES}/${categoryId}`);
    return data;
};

export const getCategoryWithShoes = async (categoryId: number, signal: AbortSignal) => {
    const {data} = await axiosClient.get<CategoryWithShoesAPIType>(`${CategoryRoutes.CATEGORIES}${CategoryRoutes.WITH_SHOES}/${categoryId}`, {signal});
    return data;
};