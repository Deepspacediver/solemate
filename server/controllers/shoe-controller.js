import asyncHandler from "express-async-handler";
import {parseRequestZod} from "../helpers/schema-parser.js";
import {
    CreateShoeSchema,
    GetShoeSchema, GetShoesWithPagination,
    UpdateShoeSchema
} from "../schema/shoe-schema.js";
import {
    createShoe,
    deleteShoe,
    getShoe, getShoes,
    updateShoe
} from "../db/queries/shoe-queries.js";

export const shoesGet = asyncHandler(async (req, res) => {
    parseRequestZod(GetShoesWithPagination, req);
    const {lastShoeId} = req.query;
    const data = await getShoes(lastShoeId);
    res.json(data);

});

export const shoeByIdGet = asyncHandler(async (req, res) => {
    parseRequestZod(GetShoeSchema, req);
    const {shoeId} = req.params;
    const data = await getShoe(shoeId);
    if (!data.shoe_id) {
        res.status(404).json({error: 'Shoe not found'});
    }
    res.json(data);
});

export const shoeCreatePost = asyncHandler(async (req, res) => {
    parseRequestZod(CreateShoeSchema, req);
    const {name, picture, description, categories} = req.body;
    const data = await createShoe(
        {name, picture, description, categoryIdArray: categories});
    res.json(data);
});

export const shoeUpdatePut = asyncHandler(async (req, res) => {
    parseRequestZod(UpdateShoeSchema, req);
    const {name, picture, description, categories} = req.body;
    const {shoeId} = req.params;

    const data = await updateShoe(
        {name, picture, shoeId, description, categoryIdArray: categories});
    if (!data) {
        res.status(404).json({error: 'Could not find shoe'});
    }
    res.json(data);
});

export const shoeRemoveDelete = asyncHandler(async (req, res) => {
    parseRequestZod(GetShoeSchema, req);
    const {shoeId} = req.params;
    const data = await deleteShoe(shoeId);
    res.json(data);
});