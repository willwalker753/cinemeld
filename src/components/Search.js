import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { movieGenreList, tvGenreList } from './util/constants';
import { connect } from 'react-redux';
import './search.css';

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
        genreList: movieGenreList,
        placeholder: '',
        searchTerm: '',
        media: 'tv',
        redirectSearch: false,
        redirectGenre: false,
        genreType: 'movie',
        genreImage: 'https://github.com/willwalker753/organizing-your-react-code/blob/master/cinemeld-no-image.png?raw=true'
    }
    this.onTextChange = this.onTextChange.bind(this);
    this.onTypeChange = this.onTypeChange.bind(this);
    this.closeSearch = this.closeSearch.bind(this);
    this.textSearch = this.textSearch.bind(this);
    this.clickOff = this.clickOff.bind(this);
    this.genreHover = this.genreHover.bind(this);
  }
  onTextChange = e => {
    this.setState({ searchTerm: e.target.value });
  }
  onTypeChange = type => {
    this.props.changeMedia(type);
    if(type === 'movie') {
        this.setState({ genreList: movieGenreList, genreType: 'movie' });
        document.getElementById('genre-type-movie').classList.add('checked');
        document.getElementById('genre-type-movie').classList.remove('unchecked');
        document.getElementById('genre-type-tv').classList.add('unchecked');
        document.getElementById('genre-type-tv').classList.remove('checked');
        document.getElementById('search-form-genre-list').classList.remove('tv-genre-selected');
    } else {
        this.setState({ genreList: tvGenreList, genreType: 'tv' });
        document.getElementById('genre-type-movie').classList.add('unchecked');
        document.getElementById('genre-type-movie').classList.remove('checked');
        document.getElementById('genre-type-tv').classList.add('checked');
        document.getElementById('genre-type-tv').classList.remove('unchecked');
        document.getElementById('search-form-genre-list').classList.add('tv-genre-selected');  
    }
  }
  closeSearch = () => {
    this.props.closePopup();
  }
  textSearch = e => {
    e.preventDefault();
    if(this.state.searchTerm !== '') {
      this.setState({ redirectSearch: true });
      this.props.searchTerm(this.state.searchTerm);
    }
  }
  genreHover = e => {
    this.setState({ genreImage: e.target.id })
  }
  clickOff = e => {
    if(e.target.id === 'search-box-outer') {this.closeSearch()}
  }
  render() {
    let { genreList, redirectSearch, searchTerm, genreType, genreImage } = this.state;
    if(redirectSearch) {
      return <Redirect to={'/search/'+searchTerm} />
    }
    return (
      <div id='search-box-outer' onClick={this.clickOff}>
        <div id='search-box-inner'>
          <form id='search-form' onSubmit={this.textSearch}>
            <h3>Search by Name</h3>
            <div id='search-form-text'>
              <i className='fas fa-search' title='Search' onClick={this.textSearch}></i>
              <input 
                  type='text' 
                  placeholder={this.props.placeholder}
                  onChange={this.onTextChange}
                  onSubmit={this.textSearch}>
              </input>
            </div>
            <h3>Or by Genre</h3>
            <div id='search-form-genre'>
                <p id='genre-type-movie' onClick={() => this.onTypeChange('movie')} className='checked'>Movie</p>
                <p id='genre-type-tv' onClick={() => this.onTypeChange('tv')} className='unchecked'>TV Show</p>
            </div>
            <div id='search-form-genre-list-box'>
              <div id='search-form-genre-list'>
                {genreList.map((item, index) => (
                  <a key={index} id={item.img} onMouseEnter={this.genreHover} href={'/genre/'+genreType+'/'+item.id}>{item.name}</a>
                ))}
              </div>
              <img src={genreImage} alt='genre'></img>
            </div>
          </form>
          <div id='search-box-close' onClick={this.closeSearch}><i className="fas fa-times"></i></div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { mediaType, showPopup } = state;
  return { media: mediaType, showPopup };
}

const mapDispatchToProps = dispatch => {
  return {
      changeMedia: data => dispatch({ type: 'CHANGE_MEDIA', payload: data }),
      searchTerm: data => dispatch({ type: 'CHANGE_TERM', payload: data }),
      closePopup: () => dispatch({ type: 'CLOSE_POPUP'})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);