import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import Search from './Search';
import './nav.css';

class Nav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirectHome: false
    }
    this.home = this.home.bind(this);
    this.account = this.account.bind(this);
    this.search = this.search.bind(this);
  }
  componentDidMount() {
    
  }
  home = () => {
    if(window.location.pathname === '/') {
      window.location.reload();
    }
    else {
      this.setState({
        redirectHome: true
      });
    }
    
  }
  account = () => {
    this.props.loggedIn(true)
  }
  search = () => {
    let searchElement = document.getElementById('search-box-outer');
    if(searchElement.className && searchElement.className === 'hidden') {
      document.getElementById('search-box-outer').classList.remove('hidden');
      document.getElementById('details-component').classList.remove('hidden');
      document.getElementById('details-component').classList.add('hidden');
    } else {
      document.getElementById('search-box-outer').classList.add('hidden');
    }
  }
  render() {
    let { redirectHome } = this.state;
    if(redirectHome) {
      return <Redirect to='/'/>
    }
    return (
      <div id='nav-box-outer'>
        <div id='nav-box'>
          <div onClick={this.home}>
              <img 
                id='nav-logo' 
                title='Home'
                src='https://github.com/willwalker753/cinemeld/blob/main/public/android-chrome-192x192.png?raw=true' 
                alt='logo'>
              </img>
            <p id='nav-logo-name'>Cinemeld</p>
          </div>
          <div onClick={this.account}>
            <i className="fas fa-user-circle" title='Account' ></i>
            <p>Account</p>
          </div>
          <div onClick={this.search}>
            <i className="fas fa-search" title='Search'></i>
            <p>Search</p>
          </div>
        </div>
        {/* <Account /> */}
        <Search />
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  const { account } = state;
  return { loggedIn: account.loggedIn };
}

const mapDispatchToProps = dispatch => {
  return {
      loggedIn: data => dispatch({ type: 'LOGGED_IN', payload: data }),
      accountId: data => dispatch({ type: 'ACCOUNT_ID', payload: data })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Nav));