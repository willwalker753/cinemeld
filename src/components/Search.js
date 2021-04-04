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
        searchTerm: '',
        genreId: '',
        media: 'tv',
        genreType: 'movie',
        redirectSearch: false,
        redirectGenre: false
    }
    this.onTextChange = this.onTextChange.bind(this);
    this.onTypeChange = this.onTypeChange.bind(this);
    this.closeSearch = this.closeSearch.bind(this);
    this.textSearch = this.textSearch.bind(this);
    this.genreSearch = this.genreSearch.bind(this);
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
    } else {
        this.setState({ genreList: tvGenreList, genreType: 'tv' });
        document.getElementById('genre-type-movie').classList.add('unchecked');
        document.getElementById('genre-type-movie').classList.remove('checked');
        document.getElementById('genre-type-tv').classList.add('checked');
        document.getElementById('genre-type-tv').classList.remove('unchecked');
    }
  }
  closeSearch = () => {
    document.getElementById('search-box-outer').classList.add('hidden');
  }
  textSearch = e => {
    e.preventDefault();
    if(this.state.searchTerm !== '') {
      this.setState({ redirectSearch: true });
      this.props.searchTerm(this.state.searchTerm);
    }
  }
  genreSearch = e => {
    this.setState({
      genreId: e.target.value,
      redirectGenre: true
    });
    this.props.searchTerm(e.target.value);
  }
  render() {
    let { genreList, redirectSearch, searchTerm, redirectGenre, genreId, genreType } = this.state;
    if(redirectSearch) {
      if(window.location.pathname.includes('search')) {
        //window.location.reload();
      }
      return <Redirect to={'/search/'+searchTerm} />
    }
    if(redirectGenre) {
      if(window.location.pathname.includes('genre')) {
        //window.location.reload();
      }
      return <Redirect to={'/genre/'+genreType+'/'+genreId} />
    }
    return (
      <div id='search-box-outer' className='hidden'>
        <div id='search-box-inner'>
          <form id='search-form' onSubmit={this.textSearch}>
              <div id='search-form-text'>
                  <input 
                      type='text' 
                      placeholder='Search for your favorite movies and tv shows'
                      onChange={this.onTextChange}
                      onSubmit={this.textSearch}>
                  </input>
                  <i className='fas fa-search' title='Search' onClick={this.textSearch}></i>
              </div>
              <p>or search by genre</p>
              <div id='search-form-genre'>
                  <p>Type:</p>
                  <p id='genre-type-movie' onClick={() => this.onTypeChange('movie')} className='checked'>Movie</p>
                  <p id='genre-type-tv' onClick={() => this.onTypeChange('tv')} className='unchecked'>TV Show</p>
                  <select onChange={this.genreSearch}>
                    <option disabled defaultValue selected>Genre</option>
                      {genreList.map((item, index) => (
                          <option key={index} value={item.id}>{item.name}</option>
                      ))}
                  </select>
              </div>
          </form>
          <div id='search-box-close' onClick={this.closeSearch}><i className="fas fa-times"></i></div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { mediaType } = state;
  return { media: mediaType };
}

const mapDispatchToProps = dispatch => {
  return {
      changeMedia: data => dispatch({ type: 'CHANGE_MEDIA', payload: data }),
      searchTerm: data => dispatch({ type: 'CHANGE_TERM', payload: data })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);