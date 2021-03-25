import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route } from 'react-router-dom';

ReactDOM.render(
  <Router>
    <div>
      <Route exact path='/'>
        <App />
      </Route>
    </div>
  </Router>,
  document.getElementById('root')
);

reportWebVitals();
