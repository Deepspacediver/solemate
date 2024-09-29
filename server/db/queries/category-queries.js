import * as db from '../pool.js';

export const getCategories = async (lastCategoryId) => {

    const {rows} = !lastCategoryId ? await db.query(
            `SELECT * FROM categories ORDER BY category_id LIMIT 15`) :
        await db.query(
            `SELECT * FROM categories WHERE category_id > $1 ORDER BY category_id LIMIT 15`,
            [lastCategoryId]);

    return rows ?? [];
};

export const getCategory = async (categoryId) => {
    const {rows} = await db.query(
        `SELECT * FROM categories WHERE category_id = $1`,
        [categoryId]);
    return rows[0];
};

export const createCategory = async ({name, picture, description}) => {
    const {rows} = await db.query(
        'INSERT INTO categories (name, picture, description) VALUES ($1, $2, $3) RETURNING *',
        [name, picture, description]);

    return rows[0];
};

export const updateCategory = async ({
                                         categoryId, name,
                                         picture, description
                                     }) => {
    const {rows} = await db.query(
        'UPDATE categories SET name=$1, picture=$2, description=$3 WHERE category_id=$4 RETURNING  *',
        [name, picture, description, categoryId]);
    return rows[0];
};

export const getShoesFromCategory = async (categoryId) => {
    const {rows} = await db.query(`SELECT shoes.shoe_id, shoes.picture, shoes.name 
                   FROM shoes JOIN shoes_with_categories AS shoe_cat 
                   ON shoe_cat.category_id = $1 AND shoes.shoe_id = shoe_cat.shoe_id`,
        [categoryId]);
    return rows;
};

export const removeCategory = async (categoryId) => {
    await db.query('DELETE FROM categories WHERE category_id=$1',
        [categoryId]);
    const allCategories = await db.query('SELECT * FROM categories');
    return allCategories.rows;
};

export const getShoesWithoutCategories = async () => {
    const {rows} = await db.query(`SELECT DISTINCT shoes.shoe_id, shoes.picture, shoes.name
            FROM shoes LEFT JOIN shoes_with_categories AS shoe_cat 
            ON shoes.shoe_id = shoe_cat.shoe_id WHERE shoe_cat.category_id IS NULL`);
    return rows;

};

export const getCategoryWithShoes = async (categoryId, lastShoeId) => {
    const {rows: categoryData} = await db.query(`SELECT * FROM categories 
            WHERE category_id = $1`, [categoryId]);
    const {rows: shoes} =
        !lastShoeId ?
            await db.query(`SELECT shoes.shoe_id, shoes.picture, shoes.description, shoes.name FROM shoes 
            JOIN shoes_with_categories AS shoe_cat ON shoes.shoe_id = shoe_cat.shoe_id 
            WHERE shoe_cat.category_id = $1 ORDER BY shoe_cat.shoe_id`,
                [categoryId])
            :
            await db.query(`SELECT shoes.shoe_id, shoes.picture, shoes.description, shoes.name FROM shoes 
            JOIN shoes_with_categories AS shoe_cat ON shoes.shoe_id = shoe_cat.shoe_id 
            WHERE shoe_cat.category_id = $1 AND shoe_cat.shoe_id > $2 ORDER BY shoe_cat.shoe_id`,
                [categoryId, lastShoeId]);
    
    return {
        category: categoryData[0],
        shoes
    };
};
