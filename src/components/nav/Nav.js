import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import Account from '../account/Account';
import Search from '../search/Search';
import SignupInfo from '../account/signupInfo/SignupInfo';
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
    this.signOut = this.signOut.bind(this);
  }
  componentDidMount() {
    if(window.sessionStorage.getItem('accountId')) {
      this.props.loggedIn(true);
      this.props.accountId(window.sessionStorage.getItem('accountId'));
      this.props.username(window.sessionStorage.getItem('username'));
      this.props.email(window.sessionStorage.getItem('email'));
    }
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
  account = (type) => {
    if(this.props.showPopup.account === true) {
      this.props.closePopup();
    } else {
      this.props.navSelectionType(type)
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
  signOut = () => {
    this.props.signOut();
    window.sessionStorage.clear();
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
          {this.props.account.loggedIn ?
            <div onClick={() => this.account("signup")}>
              <i className="fas fa-user-circle" title='Account' ></i>
              <p>Account</p>
            </div>
          :
            <>
              <div onClick={() => this.account("login")}>
                <i className="fas fa-user-circle" title='Login' ></i>
                <p>Login</p>
              </div>
              <div onClick={() => this.account("signup")}>
                <i className="fas fa-user-plus" title='Signup' ></i>
                <p>Sign&nbsp;Up</p>
              </div>
            </>
          }
          
          <div onClick={this.search}>
            <i className="fas fa-search" title='Search'></i>
            <p>Search</p>
          </div>
          {this.props.account.loggedIn ?
            <div onClick={this.signOut}>
              <i className="fas fa-sign-out-alt" title='Sign Out'></i>
              <p>Logout</p>
            </div>
          : null}
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
  return { account, showPopup };
}

const mapDispatchToProps = dispatch => {
  return {
      loggedIn: data => dispatch({ type: 'LOGGED_IN', payload: data }),
      accountId: data => dispatch({ type: 'ACCOUNT_ID', payload: data }),
      closePopup: () => dispatch({ type: 'CLOSE_POPUP'}),
      showSearch: () => dispatch({ type: 'SHOW_SEARCH'}),
      showAccount: () => dispatch({ type: 'SHOW_ACCOUNT'}),
      username: data => dispatch({ type: 'USERNAME', payload: data }),
      email: data => dispatch({ type: 'EMAIL', payload: data }),
      signOut: () => dispatch({ type: 'SIGN_OUT'}),
      navSelectionType: data => dispatch({ type: 'NAV_SELECTION_TYPE', payload: data })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Nav));