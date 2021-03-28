import React, { Component } from 'react';
import Search from './Search';
import './nav.css';

export default class Nav extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
    this.account = this.account.bind(this);
    this.search = this.search.bind(this);
  }
  componentDidMount() {
    
  }
  account = () => {

  }
  search = () => {
    let searchClass = document.getElementById('search-box-outer');
    if(searchClass.className === 'hidden') {
      searchClass.className = '';
    } else {
      searchClass.className = 'hidden';
    }
  }
  render() {
    return (
      <div id='nav-box-outer'>
        <div id='nav-box'>
          <a href='/'>
              <img 
                  id='nav-logo' 
                  title='Home'
                  src='https://github.com/willwalker753/cinemeld/blob/main/public/android-chrome-192x192.png?raw=true' 
                  alt='logo'>
              </img>
          </a>
          <i className="fas fa-user-circle" title='Account' onClick={this.account}></i>
          <i className="fas fa-search" title='Search' onClick={this.search}></i>
        </div>
        <Search />
      </div>
    )
  }
}