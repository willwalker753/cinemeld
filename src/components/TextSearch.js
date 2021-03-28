import React, { Component } from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';
import InfiniteScroll from "react-infinite-scroll-component";
import movieDataConverter from './util/functions';
import apiURL from './util/apiURL';
import Nav from './Nav';

class TextSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      movieList: [],
      term: '',
      page: 3,
      hasMore: true
    }
    this.getMoreData = this.getMoreData.bind(this);
    this.validatePoster = this.validatePoster.bind(this);
  }
  async componentDidMount() {
    let term = this.props.match.params.term;
    let movieList = [];
    this.setState({ term: term })
    if(term !== '') {
      await axios.get(apiURL()+'/search?term='+term+'&page=1')
        .then(res => {
          movieList = res.data;
        })
      await axios.get(apiURL()+'/search?term='+term+'&page=2')
        .then(res => {
          movieList = movieList.concat(res.data);
          movieList = this.validatePoster(movieList);
          movieList = movieDataConverter(movieList);
        })
      this.setState({ movieList: movieList });
    }
  }
  getMoreData() {
    if(this.state.page < 50) {
      axios.get(apiURL()+'/search?term='+this.state.term+'&page='+this.state.page)
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
      .catch(error => {
        if(error.repsonse.status === 404) {
          this.setState({ hasMore: false})
        }
      })
    }
  }
  validatePoster = data => {
    let newArr = [];
    for(let i=0; i<data.length; i++) {
      if(data[i].poster_path !== null && data[i].poster_path !== undefined) {
        newArr.push(data[i]);
      }
    }
    return newArr;
  }
  render() {
    let { movieList, hasMore } = this.state;
    return (
      <>
        <Nav />
        <InfiniteScroll
          dataLength={movieList.length}
          next={this.getMoreData}
          hasMore={hasMore}
          loader={<></>}
        >
          <div className='app-movie-box'>
            <div className='app-img-box'>
              {movieList.map((movie, index) => (
                <img 
                  key={index} 
                  className ='app-movie' 
                  src={'https://image.tmdb.org/t/p/w500/'+movie.poster_path} 
                  alt={movie.title}>
                </img>
              ))}
            </div>
            <div className='app-overlay-box'>
              {movieList.map((movie, index) => (
                <div key={index} className ='app-overlay hidden-movie'>
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
      </>
    )
  }
}



export default withRouter(TextSearch);