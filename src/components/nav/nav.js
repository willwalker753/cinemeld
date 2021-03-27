import React, { Component } from 'react';
import './nav.css';

export default class Nav extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
    this.account = this.account.bind(this);
  }
  componentDidMount() {
    
  }
  account = () => {
      console.log('something')
  }
  render() {
    return (
      <div id='nav-box'>
        <a href='/'>
            <img 
                id='nav-logo' 
                title='Home'
                src='https://github.com/willwalker753/cinemeld/blob/main/public/android-chrome-192x192.png?raw=true' 
                alt='logo'>
            </img>
        </a>
        <i className="fas fa-user-circle" title='Account' onClick={ this.account }></i>
        <i className="fas fa-search" title='Search'></i>
      </div>
    )
  }
}