require("dotenv").config();
const express = require("express");
const app = express();
const port = 3009;
const { Pool } = require('pg');
const cors = require('cors')
app.use(express.json());

app.use(cors());

function makeQuestionid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  
    for (var i = 0; i < 10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }

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
app.get ("/faq/:id", async (req, res) => {
    var id = req.params.id;
    try {
        let client = await pool.connect();
        const data = await client.query(`SELECT * FROM qanda WHERE asin_id = '${id}';`)
        res.json(data.rows);
        client.release();
    }

    catch (err) {
        console.log("ERROR!")
    }

});

//get single question by id
app.get ("/question/:id", async (req, res) => {
    var id = req.params.id;
    try {
        let client = await pool.connect();
        const data = await client.query(`SELECT * FROM qanda WHERE question_id = '${id}';`)
        res.json(data.rows);
        client.release();
    }

    catch (err) {
        console.log("ERROR!")
    }

});


//post a question
app.post ("/question/post", async (req, res) => {
    let question_title = req.body.question_title;
    let asin_id = req.body.asin_id;
    let question_id= makeQuestionid();
    let question_user=req.body.question_user;
    let answer_text="No answers yet! Be the first one to answer."
    let month = new Date().toLocaleString('en-us', { month: 'long' });
    let year = new Date().getUTCFullYear();
    let date = new Date().getUTCDate();
    let fullDate = `${month} ${date}, ${year}`;
  
        try {
            let client = await pool.connect();
            const data = await client.query(`INSERT INTO qanda (question_id, question_title, question_date, answer_text, question_user, asin_id) VALUES ('${question_id}', '${question_title}', '${fullDate}', '${answer_text}', '${question_user}', '${asin_id}');`);
            res.json("POSTED!");
            client.release();
        }
    
        catch (err) {
            console.log("ERROR!")
        }
        
    })
//post an answer
    app.patch ("/answer/:id", async (req, res) => {
        let answer_text = req.body.answer_text;
        let answer_text_value= answer_text.replace(/'/g, '');
        let question_id= req.params.id;

            try {
                let client = await pool.connect();
                const data = await client.query(`UPDATE qanda SET answer_text='${answer_text_value}' WHERE question_id = '${question_id}';`);
                res.json("POSTED!");
                client.release();
            }
        
            catch (err) {
                console.log("ERROR!")
            }
            
        })


app.listen(port, () => console.log(`Server is running on ${port}!`));