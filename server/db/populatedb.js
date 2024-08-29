import 'dotenv/config';
import pg from 'pg';

const {Client} = pg;


const SQL = ` CREATE TABLE IF NOT EXISTS shoes (
        shoe_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name VARCHAR(255),
        picture TEXT DEFAULT '',
        description TEXT DEFAULT ''
        );
    
    CREATE TABLE IF NOT EXISTS categories (
        category_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name VARCHAR(255),
        picture TEXT DEFAULT ''
        );
        
                
    CREATE TABLE IF NOT EXISTS shoes_with_categories (
        shoe_id INTEGER REFERENCES shoes ON DELETE CASCADE, 
        category_id INTEGER REFERENCES categories ON DELETE CASCADE
        );

    `;

const host = process.env.PGHOST;
const user = process.env.PGUSER;
const password = process.env.PGPASSWORD;
const db = process.env.PGDATABASE;
const port = process.env.PGPORT;

async function main() {
    const myClient = new Client({
        connectionString: `postgresql://${user}:${password}@${host}:${port}/${db}`,
    });

    await myClient.connect();
    await myClient.query(SQL);
    await myClient.end();
}

main();