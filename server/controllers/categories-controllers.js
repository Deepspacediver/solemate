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

export const categoryGet = asyncHandler(async (req, res) => {
    parseRequestZod(shoesWithCategorySchema, req);
    const {categoryId} = req.params;
    const data = await db.getCategory(categoryId);
    res.json(data);
});

export const categoryCreatePost = asyncHandler(async (req, res) => {

    parseRequestZod(categoryCreationSchema, req);


    const {picture, name, description} = req.body;

    const createdCategory = await db.createCategory(
        {picture, name, description});
    res.json(createdCategory);
});


export const categoryUpdatePost =
    asyncHandler(async (req, res) => {
        parseRequestZod(categoryUpdateSchema, req);
        const {categoryId} = req.params;
        const {picture, name, description} = req.body;

        const updatedCategory = await db.updateCategory({
            categoryId, picture, name, description
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

    const remainingCategories = await db.removeCategory(categoryId);
    res.json(remainingCategories);

});

export const shoesWithoutCategoriesGet = asyncHandler(async (req, res) => {
    const data = await db.getShoesWithoutCategories();
    res.json(data);
});

export const categoryWithShoesGet = asyncHandler(async (req, res) => {
    const {categoryId} = req.params;
    console.log(categoryId);
    parseRequestZod(shoesWithCategorySchema, req);
    const data = await db.getCategoryWithShoes(categoryId);
    res.json(data);
});

