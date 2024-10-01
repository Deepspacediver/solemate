import pg from 'pg';

const user = process.env.POSTGRES_USER;
const password = process.env.POSTGRES_PASSWORD;
const host = process.env.POSTGRES_HOST;
const database = process.env.POSTGRES_DATABASE;
const port = process.env.POSTGRES_PORT;

const {Pool} = pg;

const pool = new Pool({
    host,
    user,
    database,
    password,
    port
});

export const query = async (text, params, callback) => {
    return await pool.query(text, params, callback);
};
