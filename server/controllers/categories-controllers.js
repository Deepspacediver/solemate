import asyncHandler from "express-async-handler";
import * as db from "../db/queries/category-queries.js";
import {z} from 'zod';
import {zParse} from "../helpers/schema-parser.js";


const categoriesGet = asyncHandler(async (req, res) => {
    const rows = await db.getCategories();
    res.json(rows);
});


const categoryUpdateSchema = z.object({
    body: z.object(
        {
            categoryId: z.number(
                {message: 'Category id must be a number'}),
            name: z.string({message: 'Name cannot be empty'}).trim(),
            picture: z.string({message: 'Picture cannot be empty'}).url(
                {message: 'Picture must be a link'}).trim(),

        }
    )
});

const categoryUpdatePost =
    asyncHandler(async (req, res) => {
        zParse(categoryUpdateSchema, req);

        const {categoryId} = req.params;
        const {picture, name} = req.body;

        const updatedCategory = await db.updateCategory({
            categoryId, picture, name
        });
        res.json(updatedCategory);
    });


export {
    categoriesGet,
    categoryUpdatePost
};