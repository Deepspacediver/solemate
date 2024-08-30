import * as db from '../pool.js';

export const getCategories = async () => {
    const {rows} = await db.query(`SELECT * FROM categories`);
    return rows ?? [];
};

export const updateCategory = async ({categoryId, name, picture}) => {
    const {rows} = await db.query(
        'UPDATE categories SET name=$1, picture=$2 WHERE category_id=$3 RETURNING  *',
        [name, picture, categoryId]);
    return rows[0];
};

