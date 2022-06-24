require("dotenv").config();
const express = require("express");
const app = express();
const port = 3009;
const { Pool } = require('pg');
const cors = require('cors')
app.use(express.json());

app.use(cors());

const pool = new Pool({
    // connectionString: process.env.DATABASE_URL,
    // ssl: {
    //   rejectUnauthorized: false
    // }
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });

//get all Question and answers 
app.get ("/faq", async (req, res) => {
    try {
        let client = await pool.connect();
        const data = await client.query('SELECT * FROM entries;')
        res.json(data.rows);
        client.release();
    }

    catch (err) {
        console.log("ERROR!")
    }

});
