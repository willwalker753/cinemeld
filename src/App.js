import React, { Component } from 'react';
import Nav from './components/nav/nav';
import axios from 'axios';
import apiURL from './components/util/apiURL';
import './app.css';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      movieList: [],
    }
  }
  componentDidMount() {
    axios.get(apiURL() + '/')
      .then(res => {
        console.log(res);
        this.setState({ movieList: res.data })
      })
  }
  render() {
    let { movieList } = this.state;
    return (
      <>
        <Nav />
        <div className='app-movie-box'>
          {movieList.map((movie, index) => (
            <img 
              key={index} 
              className ='app-movie' 
              src={'https://image.tmdb.org/t/p/w500/'+movie.poster_path} 
              alt='movie poster'>
            </img>
          ))}
        </div>
      </>
    )
  }
}

