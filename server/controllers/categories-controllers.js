import asyncHandler from "express-async-handler";
import * as db from "../db/queries/category-queries.js";
import {parseRequestZod} from "../helpers/schema-parser.js";
import {
    categoryCreationSchema, categoryDeletionSchema,
    categoryUpdateSchema, shoesWithCategorySchema
} from "../schema/category-schema.js";


export const categoriesGet = asyncHandler(async (req, res) => {
    const rows = await db.getCategories();
    res.json(rows);
});


export const categoryCreatePost = asyncHandler(async (req, res) => {
    parseRequestZod(categoryCreationSchema, req);

    const {picture, name} = req.body;

    const createdCategory = await db.createCategory({picture, name});
    res.json(createdCategory);
});


export const categoryUpdatePost =
    asyncHandler(async (req, res) => {
        parseRequestZod(categoryUpdateSchema, req);
        const {categoryId} = req.params;
        const {picture, name} = req.body;

        const updatedCategory = await db.updateCategory({
            categoryId, picture, name
        });
        res.json(updatedCategory);
    });

export const shoesWithCategoryGet = asyncHandler(async (req, res) => {
    parseRequestZod(shoesWithCategorySchema, req);

    const {categoryId} = req.params;

    const shoesWithCategory = await db.getShoesFromCategory(categoryId);
    res.json(shoesWithCategory);
});

export const categoryRemoveDelete = asyncHandler(async (req, res) => {
    parseRequestZod(categoryDeletionSchema, req);
    const {categoryId} = req.body;

    const remaininigCategories = await db.removeCategory(categoryId);
    res.json(remaininigCategories);

});

export const shoesWithoutCategoriesGet = asyncHandler(async (req, res) => {
    const data = await db.getShoesWithoutCategories();
    res.json(data);
});

