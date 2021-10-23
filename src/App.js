import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from './components/Nav';
import Details from './components/Details';
import Loading from './components/Loading';
import axios from 'axios';
import apiURL from './components/util/apiURL';
import movieDataConverter from './components/util/movieDataConverter';
// import tempMovieList from './components/util/constants'
import InfiniteScroll from 'react-infinite-scroll-component';
import './app.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      movieList: [], //tempMovieList.tempMovieList
      page: 3,
      detailsMediaType: '',
      detailsId: ''
    }
    this.getMoreData = this.getMoreData.bind(this);
    this.validatePoster = this.validatePoster.bind(this);
    this.movieClick = this.movieClick.bind(this);
  }
  async componentDidMount() {
    document.getElementById('loading-component').classList.remove('hidden');
    let movieList = [];
    await axios.get(apiURL()+'/home?page=1')
      .then(res => {
        movieList = res.data;
      })
    await axios.get(apiURL()+'/home?page=2')
      .then(res => {
        movieList = movieList.concat(res.data);
        movieList = this.validatePoster(movieList);
        movieList = movieDataConverter(movieList);
        document.getElementById('app-title').classList.remove('hidden');
        document.getElementById('loading-component').classList.add('hidden');
      })
    this.setState({ movieList: movieList });
  }
  getMoreData = async() => {
    if(this.state.page < 50) {
      await axios.get(apiURL()+'/home?page='+this.state.page)
      .then(res => {
        let tempMovieList = this.validatePoster(res.data);
        tempMovieList = movieDataConverter(tempMovieList);
        let movieList = this.state.movieList;
        movieList = movieList.concat(tempMovieList);
        let nextPage = this.state.page + 1;
        this.setState({ 
          movieList: movieList,
          page: nextPage
        });
      })
    }
  }
  validatePoster = data => {
    let newArr = [];
    for(let i=0; i<data.length; i++) {
      if(data[i].poster_path !== null || data[i].poster_path !== undefined) {
        newArr.push(data[i]);
      }
    }
    return newArr;
  }
  movieClick = (media_type, id) => {
    this.setState({
      detailsMediaType: media_type,
      detailsId: id,
    });
    //document.getElementById('loading-component').classList.remove('hidden');
    // setTimeout(function(){
    //   document.getElementById('loading-component').classList.add('hidden');
    //   this.props.showDetails();
    // }.bind(this), 300);
    this.props.showDetails();
  }
  render() {
    let { movieList } = this.state;
    return (
      <>
        <Nav />
        <h2 id='app-title' className='hidden'>Popular Movies Now</h2>
        
        <Loading />
        {this.props.showPopup.details ? <Details media_type={this.state.detailsMediaType} id={this.state.detailsId} /> : null}
      </>
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
      showDetails: () => dispatch({ type: 'SHOW_DETAILS'})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);