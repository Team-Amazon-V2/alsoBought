import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

function Addanswer (props) {
    const handlePostAnswerSubmit = (e) => {
        let answerTextInput = document.querySelector('#answerTextInput').value;
        let newObj={
            "answer_text": answerTextInput
        }

        fetch(`http://localhost:3009/answer/${e.target.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newObj)
            })

            alert("Thanks for answering!");
            window.location.href = "/";
    }

    if (props.questionLoading) {
        return (<h1>Loading......</h1>)
      }

      else {

        return (
            <div className='postAnswer-container'>
                {props.questionData.map((elem) =>{
                    return (
                        <div>
                        <span className='question-title'><b>{elem.question_title}</b></span>
                        <br></br>
                        <small>asked on {elem.question_date}</small>
                        <p><b>Add a written answer</b></p>
                        <textarea maxLength="4000" placeholder="Type your answer here..." id='answerTextInput' className='answerTextArea'></textarea>
                        <br></br>
                        <br></br>
                        <button className="postAnswer-button" type="submit" id={elem.question_id} onClick={handlePostAnswerSubmit} >Answer</button>
                        <br></br>
                        <br></br>
                        <Link to="/" className='ReturnToFAQ'>See all questions about this product</Link>
                        </div>
                    )
                        

                })}
            
            </div>
            );
      }
    
}

export default Addanswer;