import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import Account from './Account';
import Search from './Search';
import SignupInfo from './SignupInfo';
import './nav.css';

class Nav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirectHome: false,
      searchPlaceholder: ''
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
    if(this.props.showPopup.account === true) {
      this.props.closePopup();
    } else {
      this.props.showAccount();
    }
  }
  search = () => {
    const exampleSearches = ['big bang theory', 'the walking dead', 'breaking bad', 'harry potter', 'justice league', 'saving private ryan', 'the godfather', 'star wars', 'the witcher', 'ozark'];
    let placeholder = exampleSearches[Math.floor(Math.random() * exampleSearches.length)];
    this.setState({ searchPlaceholder: placeholder });
    if(this.props.showPopup.search === true) {
      this.props.closePopup();
    } else {
      this.props.showSearch();
    }
  }
  render() {
    let { redirectHome, searchPlaceholder } = this.state;
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
        {this.props.showPopup.account ? <Account /> : null}
        {this.props.showPopup.search ? <Search placeholder={searchPlaceholder}/> : null}
        {this.props.showPopup.signup ? <SignupInfo /> : null}
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  const { account, showPopup } = state;
  return { loggedIn: account.loggedIn, showPopup };
}

const mapDispatchToProps = dispatch => {
  return {
      loggedIn: data => dispatch({ type: 'LOGGED_IN', payload: data }),
      accountId: data => dispatch({ type: 'ACCOUNT_ID', payload: data }),
      closePopup: () => dispatch({ type: 'CLOSE_POPUP'}),
      showSearch: () => dispatch({ type: 'SHOW_SEARCH'}),
      showAccount: () => dispatch({ type: 'SHOW_ACCOUNT'})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Nav));