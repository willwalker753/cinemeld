import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import axios from 'axios';
import InfiniteScroll from "react-infinite-scroll-component";
import movieDataConverter from './util/movieDataConverter';
import apiURL from './util/apiURL';
import Nav from './Nav';
import Details from './Details';
import Loading from './Loading';

class TextSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      movieList: [],
      id: '',
      page: 3,
      hasMore: true,
      detailsMediaType: '',
      detailsId: '',
      similarName: ''
    }
    this.getMoreData = this.getMoreData.bind(this);
    this.validatePoster = this.validatePoster.bind(this);
    this.movieClick = this.movieClick.bind(this);
  }
  async componentDidMount() {
    document.getElementById('loading-component').classList.remove('hidden');
    let id = this.props.match.params.id;
    let type = this.props.match.params.type;
    let movieList = [];
    this.setState({ id: id, type: type })
    this.props.closePopup();
    if(id !== '') {
      await axios.get(apiURL()+'/similar?type='+type+'&id='+id+'&page=1')
        .then(res => {
          movieList = res.data.results;
        })
      await axios.get(apiURL()+'/similar?type='+type+'&id='+id+'&page=2')
        .then(res => {
          movieList = movieList.concat(res.data.results);
          movieList = this.validatePoster(movieList);
          movieList = movieDataConverter(movieList);
          document.getElementById('app-title').classList.remove('hidden');
          document.getElementById('loading-component').classList.add('hidden');
        })
      this.setState({ movieList: movieList });
    }
  }
  componentDidUpdate(oldProps) {
    if(oldProps.term !== this.props.term) {
      this.componentDidMount()
    }
  }
  getMoreData() {
    if(this.state.page < 50) {
      axios.get(apiURL()+'/similar?type='+this.state.type+'id='+this.state.id+'&page='+this.state.page)
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
  movieClick = (media_type, id) => {
    this.setState({
      detailsMediaType: media_type,
      detailsId: id,
    });
    this.props.showDetails();
  }
  render() {
    let { movieList, hasMore } = this.state;
    return (
      <>
        <Nav />
        <h2 id='app-title' className='hidden'>Similar to {this.props.similar.name}</h2>
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
                      <p className={'app-genre-'+genre.color} key={index}>{genre.name}</p>
                    ))}
                  </div>
                  
                </div>
              ))}
            </div>
          </div>
        </InfiniteScroll>
        <Loading />
        {this.props.showPopup.details ? <Details media_type={this.state.detailsMediaType} id={this.state.detailsId} /> : null}
      </>
    )
  }
}

const mapStateToProps = (state) => {
  const { mediaType, termName, showPopup, similar } = state;
  return { media: mediaType, term: termName, showPopup, similar };
}

const mapDispatchToProps = dispatch => {
  return {
      changeMedia: data => dispatch({ type: 'CHANGE_MEDIA', payload: data }),
      searchTerm: data => dispatch({ type: 'CHANGE_TERM', payload: data }),
      closePopup: () => dispatch({ type: 'CLOSE_POPUP' }),
      showDetails: () => dispatch({ type: 'SHOW_DETAILS'})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TextSearch));