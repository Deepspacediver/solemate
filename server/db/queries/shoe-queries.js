import * as db from '../pool.js';

export const createShoe = async ({
                                     name,
                                     picture,
                                     description,
                                     categoryIdArray
                                 }) => {

    const {rows} = await db.query(
        'INSERT INTO shoes (name, picture, description) VALUES ($1, $2, $3) RETURNING *',
        [name, picture, description]);
    const shoeId = rows[0].shoe_id;

    for (let i = 0; i < categoryIdArray.length; i++) {
        const currentCategoryId = categoryIdArray[i];
        await db.query(
            'INSERT INTO shoes_with_categories (category_id, shoe_id) VALUES ($1, $2)',
            [currentCategoryId, shoeId]);
    }

    return rows[0];

};

export const updateShoe = async ({
                                     name, picture, description, shoeId,
                                     categoryIdArray
                                 }) => {
    const {rows} = await db.query(`UPDATE shoes SET name=$1, picture = $2,
                   description=$3 WHERE shoe_id = $4 RETURNING *`,
        [name, picture, description, shoeId]);

    await db.query(`DELETE FROM shoes_with_categories WHERE shoe_id = $1`,
        [shoeId]);


    for (let i = 0; i < categoryIdArray.length; i++) {
        const currentCategoryId = categoryIdArray[i];
        await db.query(
            'INSERT INTO shoes_with_categories (category_id, shoe_id) VALUES ($1, $2)',
            [currentCategoryId, shoeId]);
    }

    return rows[0];
};

export const getShoes = async (lastShoeId) => {
    const {rows} = !lastShoeId ? await db.query(
            'SELECT * FROM shoes ORDER BY shoe_id LIMIT 15') :
        await db.query(
            'SELECT * FROM shoes WHERE shoe_id > $1 ORDER BY shoe_id LIMIT 15',
            [lastShoeId]);
    return rows;
};

export const getShoe = async (shoeId) => {
    const {rows: shoe} = await db.query(`SELECT * FROM shoes WHERE shoe_id=$1`,
        [shoeId]);
    const {rows: categories} = await db.query(
        `SELECT shoe_cat.category_id, categories.name FROM shoes_with_categories AS shoe_cat 
                JOIN categories ON shoe_cat.category_id = categories.category_id 
                WHERE shoe_id = $1`,
        [shoeId]);
    const categoriesArray = categories.map(
        category => ({categoryId: category.category_id, name: category.name}));
    return {
        ...shoe[0],
        categories: categoriesArray
    };
};

export const deleteShoe = async (shoeId) => {
    await db.query('DELETE FROM shoes WHERE shoe_id=$1', [shoeId]);
    const {rows} = await db.query('SELECT * FROM shoes');
    return rows;
};


