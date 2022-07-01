import './FaqMain.css';
import Faq from './components/Faq';
import Addanswer from './components/Addanswers';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function FaqMain() {
  const [faqData, setFaqData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [questionData, setquestionData] = useState([]);
  const [questionLoading, setquestionLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <Router>
      <Routes>
        <Route exact path='/' element={
          <Faq setFaqData={setFaqData} faqData={faqData} loading={loading} setLoading={setLoading} setquestionData={setquestionData} setquestionLoading={setquestionLoading} modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}/>
        }>
        </Route>
        <Route exact path='/postanswer' element={
          <>
          <Addanswer questionData={questionData} questionLoading={questionLoading} />
          </>
        }>

        </Route>
        <Route exact path='/postquestion' element={
          <h1>test</h1>
        }>
        </Route>
      </Routes>
    </Router>
  )
}

export default FaqMain;
