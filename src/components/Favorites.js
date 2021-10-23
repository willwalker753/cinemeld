import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router';
import { connect } from 'react-redux';
// import axios from 'axios';
// import apiURL from './util/apiURL';
import Nav from './Nav';
import Details from './Details';
import Loading from './Loading';
import './textSearch.css';

class Favorites extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirectHome: false
    }

  }
  async componentDidMount() {
    if(this.props.account.loggedIn === false) {
      this.setState({ redirectHome: true })
    }
  }
  componentDidUpdate(oldProps) {
    if(oldProps !== this.props) {
      if(this.props.account.loggedIn === false) {
        this.setState({ redirectHome: true })
      }
    }
  }

  render() {
    let { redirectHome } = this.state;
    if(redirectHome) { return <Redirect to='/' /> }
    return (
      <>
        <Nav />
        
        <Loading />
        {this.props.showPopup.details ? <Details media_type={this.state.detailsMediaType} id={this.state.detailsId} /> : null}
      </>
    )
  }
}

const mapStateToProps = (state) => {
  const { showPopup, account } = state;
  return { showPopup, account };
}

const mapDispatchToProps = dispatch => {
  return {
      showDetails: () => dispatch({ type: 'SHOW_DETAILS'})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Favorites));