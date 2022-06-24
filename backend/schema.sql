CREATE TABLE faq (
    question_id SERIAL PRIMARY KEY NOT NULL,
    question_title VARCHAR(200),
    question_date VARCHAR,
    question_user VARCHAR,
    answer_text TEXT []
);