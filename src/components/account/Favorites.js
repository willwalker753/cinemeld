import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router';
import { connect } from 'react-redux';
import axios from 'axios';
import apiURL from '../util/apiURL';
import Nav from '../nav/Nav';
import Details from '../details/Details';
import Loading from '../loading/Loading';
import '../search/text/TextSearch';
import './favorites.css';

class Favorites extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirectHome: false,
      favoritesData: [],
      loading: true
    }

  }
  async componentDidMount() {
    this.props.closePopup();
    if(this.props.account.loggedIn === false) {
      this.setState({ redirectHome: true })
    } else {
      axios.get(apiURL()+'/user/favorites/'+this.props.account.accountId)
      .then(res => {
        console.log(res.data)
        let favoritesData = res.data;
        favoritesData = favoritesData.reverse(); // newest added will now be at top
        this.setState({ 
          favoritesData: favoritesData,
          loading: false
        })
      })
      .catch(error => {
        console.error(error)
      })
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
    let { redirectHome, favoritesData, loading } = this.state;
    if(redirectHome) { return <Redirect to='/' /> }
    return (
      <>
        <Nav />
        {favoritesData.length === 0 && loading === false ?
          <div id="favorites-empty-msg">
            <h2>You don't have any favorites yet</h2>
            <h3><em>But wait how do I add one?</em> Click on a movie or tv show then click the "Add to Favorites" button</h3>
          </div>
        : 
          <>
            <h2 id='app-title'>My Favorites</h2>
            <div id='favorites-container-outer'>
              {favoritesData.map((favorite, index) => {
                return (
                  <div key={index} className='favorites-container-row'>
                    <img src={'https://image.tmdb.org/t/p/w500'+favorite.poster_path} alt="poster" />
                    <div>
                      <h4>{favorite.title}</h4>
                      <p><em>{favorite.tagline}</em></p>
                      <div>
                        <button className="favorites-details-button"><i className="fas fa-info-circle"></i> Details</button>
                        <button className="favorites-delete-button"><i className="far fa-trash-alt"></i> Delete</button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        }
        
        <Loading showByDefault={loading}/>
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
      showDetails: () => dispatch({ type: 'SHOW_DETAILS'}),
      closePopup: () => dispatch({ type: 'CLOSE_POPUP'})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Favorites));