import React, { Component } from 'react';
import Nav from './components/Nav';
import Details from './components/Details';
import Loading from './components/Loading';
import axios from 'axios';
import apiURL from './components/util/apiURL';
import movieDataConverter from './components/util/movieDataConverter';
import tempMovieList from './components/util/constants'
import InfiniteScroll from 'react-infinite-scroll-component';
import './app.css';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      movieList: tempMovieList.tempMovieList,
      page: 3,
      detailsMediaType: '',
      detailsId: '',
    }
    this.getMoreData = this.getMoreData.bind(this);
    this.validatePoster = this.validatePoster.bind(this);
    this.movieClick = this.movieClick.bind(this);
  }
  async componentDidMount() {
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
    document.getElementById('loading-component').classList.remove('hidden');
    setTimeout(function(){
      document.getElementById('loading-component').classList.add('hidden');
      document.getElementById('details-component').classList.remove('hidden');
    }, 300);
  }
  render() {
    let { movieList } = this.state;
    return (
      <>
        <Nav />
        <h2 id='app-title'>Popular Movies Now</h2>
        <InfiniteScroll
          dataLength={this.state.movieList.length}
          next={this.getMoreData}
          hasMore={true}
          loader={<></>}
        >
          <div className='app-movie-box'>
            <div className='app-img-box'>
              {movieList.map((movie, index) => (
                <img 
                  key={index} 
                  className ='app-movie' 
                  src={'https://image.tmdb.org/t/p/w500'+movie.poster_path} 
                  alt={movie.title}>
                </img>
              ))}
            </div>
            <div className='app-overlay-box'>
              {movieList.map((movie, index) => (
                <div key={index} className ='app-overlay hidden-movie' onClick={() => this.movieClick(movie.media_type, movie.id)}>
                  <h3>{movie.title}</h3>
                  <p className='app-movie-date'>{movie.release_date}</p>
                  <p>
                    <span className={'app-movie-vote-'+movie.vote_color}>
                      {movie.vote_average}
                      </span>  
                    {movie.vote_count+' reviews'}
                  </p>
                  <div className='app-genre-box'>
                    {movie.genre_ids.map((genre, index) =>(
                      <p className={'app-genre-'+genre.color}>{genre.name}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>       
          </div>
        </InfiniteScroll>
        <Loading />
        <Details media_type={this.state.detailsMediaType} id={this.state.detailsId} />
      </>
    )
  }
}

