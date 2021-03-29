import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import TextSearch from './components/TextSearch';
import Genre from './components/Genre';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route } from 'react-router-dom';

ReactDOM.render(
  <Router>
    <div>
      <Route exact path='/'>
        <App />
      </Route>
      <Route exact path='/search/:term'>
        <TextSearch />
      </Route>
      <Route exact path='/genre/:type/:id'>
        <Genre />
      </Route>
    </div>
  </Router>,
  document.getElementById('root')
);

reportWebVitals();
