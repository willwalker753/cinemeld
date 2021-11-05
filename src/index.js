import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import allReducers from './reducers';
import './index.css';
import Home from './components/home/Home';
import Favorites from './components/account/Favorites';
import TextSearch from './components/search/text/TextSearch';
import Genre from './components/search/genre/Genre';
import Similar from './components/search/similar/Similar';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/favorites'>
          <Favorites />
        </Route>
        <Route exact path='/search/:term'>
          <TextSearch />
        </Route>
        <Route exact path='/genre/:type/:id'>
          <Genre />
        </Route>
        <Route exact path='/similar/:type/:id'>
          <Similar />
        </Route>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
