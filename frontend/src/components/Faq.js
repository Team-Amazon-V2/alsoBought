import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react'
import Modal from 'react-modal';


Modal.setAppElement('#faq-root')

function Faq(props){
    
const handlePostAnswer = (e) => {
  fetch(`http://localhost:3009/question/${e.target.id}`)
  .then ((res) => res.json())
  .then ((data) => {
    props.setquestionData(data)
    props.setquestionLoading(false)
  })
}


const handleModalSubmit = (e) => {
  let userName= document.querySelector('#fname').value;
  let qTitle = document.querySelector('#questionTextInput').value;
  let newObj= {
    "question_title": qTitle,
    "asin_id": e.target.id,
    "question_user": userName
  };

  fetch(`http://localhost:3009/question/post`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newObj)
            })
            alert("Thanks for posting your question!");
  props.setModalIsOpen(false);
  document.location.reload(true);
}

  useEffect(() => {
    fetch('http://localhost:3009/faq/B09V3HN1KC')
    .then ((res)=> res.json())
    .then ((data) => {
      props.setFaqData(data)
      props.setLoading(false)
    })
  });

  if (props.loading) {
    return (<h1>Loading......</h1>)
  }

  else {
    return (
    <div className="faq-container">
   <h2 className="faq-header">Customer questions & answers</h2>
   <br></br>
   <div className="DontSeeContainer">
   <p className="DontSeeText"><b>Don't see the answer you're looking for?</b></p>
   <button className="qPost-Button" onClick={() => props.setModalIsOpen(true)}> Post your Question</button>
   </div>
   
   <Modal isOpen={props.modalIsOpen}  className={"ReactModal__Content"}
   style={{
    overlay: {
      position: 'absolute',
      top: '30%',
      left: '25%',
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255,255,255,255)'
    }
  }}   
   >
    <div className="ModalContentContainer">
    <div className="ModalTitleContainer">
    <h3 className="ModalTitle">Post your question</h3>
    </div>
    <form className="userNameForm">
  <input type="text" id="fname" name="fname" placeholder="Please enter a name"></input>
</form>
<br></br>
    <textarea maxLength="1000" placeholder="Please enter a question." id='questionTextInput' className="questionTextArea"></textarea>
    <br></br>
    <br></br>
    <small className="qTipContainer">Your question might be answered by sellers, manufacturers, or customers who bought this product.</small>
    <br></br>
    <br></br>
    <button className="Modal-CancelButton" onClick={()=> props.setModalIsOpen(false)}>Cancel</button>
    <button className="Modal-SubmitButton" id={props.faqData[0].asin_id} onClick={handleModalSubmit}>Post</button>
    <br></br>
    <br></br>
    </div>
   </Modal>
    
    
  {props.faqData.map((elem) => {
    return (
      <div>
        <p className="question"><b>Question:</b> <Link to='/postanswer' onClick={handlePostAnswer} className="qLink" id={elem.question_id}>{elem.question_title}</Link></p>
        <p className="answer"> <b>Answer:</b> <span>{elem.answer_text}</span></p>
        <small className="question-infoText">By {elem.question_user} on {elem.question_date}</small>
        <br></br>
        <br></br>
      </div>
   
    )
  })}
      </div>
    );
  }
}

export default Faq;