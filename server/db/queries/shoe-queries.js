import * as db from '../pool.js';

export const createShoe = async ({name, picture, description}) => {
    const {rows} = await db.query(
        'INSERT INTO shoes (name, picture, description) VALUES ($1, $2, $3) RETURNING *',
        [name, picture, description]);
    return rows;
};

export const updateShoe = async ({name, picture, description, shoeId}) => {
    const {rows} = await db.query(`UPDATE shoes SET name=$1, picture = $2,
                   description=$3 WHERE shoe_id = $4 RETURNING *`,
        [name, picture, description, shoeId]);
    return rows[0];
};

export const getShoe = async (shoeId) => {
    const {rows} = await db.query(`SELECT * FROM shoes WHERE shoe_id=$1`,
        [shoeId]);
    return rows[0];
};

export const deleteShoe = async (shoeId) => {
    await db.query('DELETE FROM shoes WHERE shoe_id=$1', [shoeId]);
    const {rows} = await db.query('SELECT * FROM shoes');
    return rows;
};


