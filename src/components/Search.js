import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { movieGenreList, tvGenreList } from './constants';
import './search.css';

export default class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
        genreList: movieGenreList,
        searchTerm: '',
        redirectSearch: false
    }
    this.onTextChange = this.onTextChange.bind(this);
    this.onTypeChange = this.onTypeChange.bind(this);
    this.closeSearch = this.closeSearch.bind(this);
    this.textSearch = this.textSearch.bind(this);
  }
  componentDidMount() {
  }
  onTextChange = e => {
    this.setState({ searchTerm: e.target.value });
  }
  onTypeChange = type => {
    if(type === 'movie') {
        this.setState({ genreList: movieGenreList });
        document.getElementById('genre-type-movie').classList.add('checked');
        document.getElementById('genre-type-movie').classList.remove('unchecked');
        document.getElementById('genre-type-tv').classList.add('unchecked');
        document.getElementById('genre-type-tv').classList.remove('checked');
    } else {
        this.setState({ genreList: tvGenreList });
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
      this.setState({ redirectSearch: true })
    }
  }
  render() {
    let { genreList, redirectSearch, searchTerm } = this.state;
    if(redirectSearch) {
      return <Redirect to={'/search/'+searchTerm} />
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
                <select>
                  <option disabled defaultValue>Genre</option>
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