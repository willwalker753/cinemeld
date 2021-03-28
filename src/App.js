import React, { Component } from 'react';
import Nav from './components/Nav';
import axios from 'axios';
import apiURL from './components/apiURL';
import InfiniteScroll from "react-infinite-scroll-component";
import './app.css';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      movieList: [],
      page: 3,
    }
    this.getMoreData = this.getMoreData.bind(this);
    this.validatePoster = this.validatePoster.bind(this);
  }
  componentDidMount() {
    axios.get(apiURL()+'/home?page=1')
      .then(res => {
        this.setState({ movieList: res.data })
    });
    axios.get(apiURL()+'/home?page=2')
      .then(res => {
        let tempMovieList = this.state.movieList;
        tempMovieList = tempMovieList.concat(res.data);
        tempMovieList = this.validatePoster(tempMovieList);
        this.setState({ movieList: tempMovieList })
    });
  }
  getMoreData = () => {
    if(this.state.page < 50) {
      axios.get(apiURL()+'/home?page='+this.state.page)
      .then(res => {
        let tempMovieList = this.state.movieList;
        tempMovieList = this.validatePoster(tempMovieList);
        tempMovieList = tempMovieList.concat(res.data);
        let nextPage = this.state.page + 1;
        this.setState({ 
          movieList: tempMovieList,
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
  render() {
    let { movieList } = this.state;
    return (
      <>
        <Nav />
        <InfiniteScroll
          dataLength={this.state.movieList.length}
          next={this.getMoreData}
          hasMore={true}
          loader={<></>}
        >
          <div className='app-movie-box'>
            {movieList.map((movie, index) => (
              <img 
                key={index} 
                className ='app-movie' 
                src={'https://image.tmdb.org/t/p/w500/'+movie.poster_path} 
                alt={movie.title}>
              </img>
            ))}
          </div>
        </InfiniteScroll>
      </>
    )
  }
}

