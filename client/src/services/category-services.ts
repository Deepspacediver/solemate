import axiosClient from "@/services/index.ts";
import {CategoryType, CreateCategoryType} from "@/types/category-types.ts";

enum CategoryRoutes {
    CATEGORIES = "/categories",
    WITHOUT_CATEGORY = '/categoryless/list'
}

export const getAllCategories = async () => {
    const {data} = await axiosClient.get(CategoryRoutes.CATEGORIES);
    return data;
};

export const createCategory = async ({name, picture, description}: CreateCategoryType) => {
    const {data} = await axiosClient.post(`${CategoryRoutes.CATEGORIES}/category/add}`, {name, picture, description});
    return data;
};

export const updateCategory = async ({name, picture, description, category_id}: CategoryType) => {
    const {data} = await axiosClient.put(`${CategoryRoutes.CATEGORIES}/:${category_id}`, {
        name,
        picture,
        description,

    });

    return data;
};

export const getCategoryItemsById = async (id: number) => {
    const {data} = await axiosClient.get(`${CategoryRoutes.CATEGORIES}/${id}`);
    return data;
};

export const getItemsWithoutCategory = async () => {
    const {data} = await axiosClient.get(`$${CategoryRoutes.CATEGORIES}/${CategoryRoutes.WITHOUT_CATEGORY}`);
    return data;
};

export const deleteCategory = async (id: number) => {
    const {data} = await axiosClient.delete(`${CategoryRoutes.CATEGORIES}/${id}`);
    return data;
};