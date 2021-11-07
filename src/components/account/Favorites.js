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
      deleteButtonText: <span><i className="far fa-trash-alt"></i> Delete</span>,
      redirectHome: false,
      favoritesData: [],
      loading: true,
      detailsMediaType: '',
      detailsId: ''
    }

  }
  async componentDidMount() {
    this.props.closePopup();
    if(this.props.account.loggedIn === false) {
      this.setState({ redirectHome: true })
    } else {
      axios.get(apiURL()+'/user/favorites/'+this.props.account.accountId)
      .then(res => {
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

  detailsClick = (media_type, id) => {
    this.setState({
      detailsMediaType: media_type,
      detailsId: id,
    });
    this.props.showDetails();
  }

  deleteClick = (id, index) => {
    let favoritesData = this.state.favoritesData;
    favoritesData[index].loading = true;
    this.setState({ favoritesData: favoritesData });
    axios.delete(apiURL()+'/user/favorites/'+this.props.account.accountId+'/'+id)
    .then(res => {
      this.componentDidMount()
    })
    .catch(error => {
      console.error(error)
      favoritesData[index].loading = false;
      this.setState({ favoritesData: favoritesData });
      this.setState({ deleteButtonText: 'Please try again'})
    })
  }

  render() {
    let { redirectHome, favoritesData, loading, deleteButtonText } = this.state;
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
                    <img src={'https://image.tmdb.org/t/p/w500'+favorite.poster_path} alt="poster" onClick={() => this.detailsClick(favorite.type, favorite.moshow_id)}/>
                    <div>
                      <h4>{favorite.title}</h4>
                      <p><em>{favorite.tagline}</em></p>
                      <div>
                        <button className="favorites-details-button" onClick={() => this.detailsClick(favorite.type, favorite.moshow_id)}><i className="fas fa-info-circle"></i> Details</button>
                        {favorite.loading ? 
                          <button className="favorites-delete-button" ><i className="fas fa-spinner account-spinner"></i></button>                  
                        :                    
                          <button className="favorites-delete-button" onClick={() => this.deleteClick(favorite.moshow_id, index)}>{deleteButtonText}</button>                  
                        }
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        }
        
        <Loading showByDefault={loading}/>
        {this.props.showPopup.details ? <Details media_type={this.state.detailsMediaType} id={this.state.detailsId} dontAddToFavorites={true} /> : null}
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