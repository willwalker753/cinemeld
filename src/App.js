import React, { Component } from 'react';
import Nav from './components/nav/nav';
import axios from 'axios';
import apiURL from './components/util/apiURL';
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
  }
  componentDidMount() {
    axios.get(apiURL() + '/home?page=1')
      .then(res => {
        this.setState({ movieList: res.data })
    });
    axios.get(apiURL() + '/home?page=2')
      .then(res => {
        let tempMovieList = this.state.movieList;
        tempMovieList = tempMovieList.concat(res.data);
        this.setState({ movieList: tempMovieList })
    });
  }
  getMoreData() {
    if(this.state.page < 50) {
      axios.get(apiURL() + '/home?page=' + this.state.page)
      .then(res => {
        let tempMovieList = this.state.movieList;
        tempMovieList = tempMovieList.concat(res.data);
        let nextPage = this.state.page + 1;
        this.setState({ 
          movieList: tempMovieList,
          page: nextPage
        });
      })
    }
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
          loader={<h4>Loading...</h4>}
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

