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

export const updateShoe = async ({name, picture, description, shoeId}) => {
    const {rows} = await db.query(`UPDATE shoes SET name=$1, picture = $2,
                   description=$3 WHERE shoe_id = $4 RETURNING *`,
        [name, picture, description, shoeId]);
    return rows[0];
};

export const getShoe = async (shoeId) => {
    const {rows: shoe} = await db.query(`SELECT * FROM shoes WHERE shoe_id=$1`,
        [shoeId]);
    const {rows: categories} = await db.query(
        'SELECT category_id FROM shoes_with_categories WHERE shoe_id = $1',
        [shoeId]);
    const categoriesIdArray = categories.map(category => category.category_id);
    return {
        ...shoe[0],
        categories: categoriesIdArray
    };
};

export const deleteShoe = async (shoeId) => {
    await db.query('DELETE FROM shoes WHERE shoe_id=$1', [shoeId]);
    const {rows} = await db.query('SELECT * FROM shoes');
    return rows;
};


