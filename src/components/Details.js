import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import axios from 'axios';
import apiURL from './util/apiURL';
import './details.css';

class Details extends Component {
    constructor(props) {
        super(props)
        this.state = {
            media_type: '',
            movieDetails: {},
            redirectSimilar: false
        }
        this.formatMovieData = this.formatMovieData.bind(this);
        this.formatTvData = this.formatTvData.bind(this);
        this.closeDetails = this.closeDetails.bind(this);
        this.similar = this.similar.bind(this);
        this.clickOff = this.clickOff.bind(this);
    }
    async componentDidMount() {
        document.getElementById('loading-component').classList.remove('hidden');
        await axios.get(apiURL()+'/details?type='+this.props.media_type+'&id='+this.props.id)
            .then(res => {
                let data = res.data;
                if(this.props.media_type === 'movie') {
                    data = this.formatMovieData(res.data);
                } else if(this.props.media_type === 'tv') {
                    data = this.formatTvData(res.data);
                }
                this.setState({ 
                    media_type: this.props.media_type,
                    movieDetails: data 
                });
                document.getElementById('loading-component').classList.add('hidden');
            });
    }
    formatMovieData = data => {
        let year = data.release_date.slice(0,4);
        let month = data.release_date.slice(5,7); 
        let day = data.release_date.slice(8); 
        switch(month) {
            case '01': month = 'Jan'
                break;
            case '02': month = 'Feb'
                break;
            case '03': month = 'Mar'
                break;
            case '04': month = 'Apr'
                break;
            case '05': month = 'May'
                break;
            case '06': month = 'Jun'
                break;
            case '07': month = 'Jul'
                break;
            case '08': month = 'Aug'
                break;
            case '09': month = 'Sep'
                break;
            case '10': month = 'Oct'
                break;
            case '11': month = 'Nov'
                break;
            case '12': month = 'Dec'
                break;
            default:
                break;
        }
        if(day.charAt(0) === '0') {
            day = day.slice(1);
        }
        data.release_date = month + ' ' + day + ', ' + year;
        let vote = data.vote_average;
        let voteColor = '';
        if(vote <= 3.5) {
            voteColor = 'red';
        } else if(vote <= 7) {
            voteColor = 'yellow';
        } else { 
            voteColor = 'green' 
        }
        if(Number.isInteger(vote) && vote !== 10) {
            vote = vote + '.0';
            data.vote_average = vote;
        }
        data.vote_color = voteColor;
        let hours = data.runtime / 60;
        hours = hours.toString().slice(0,1);
        if(hours === '0') {
            hours = '';
        } else if(hours === '1') {
            hours = hours + ' hour ';
        } else {
            hours = hours + ' hours ';
        }
        let minutes = data.runtime % 60;
        data.runtime = {
            hours: hours,
            minutes: minutes
        }
        for(let g=0; g<data.genres.length; g++) {
            if(g<3) {
                data.genres[g].color = Math.floor(Math.random() * 5);         
            } 
            else {
                data.genres[g].name = '';
            }
        }
        return data;
    }
    formatTvData = data => {
        let vote = data.vote_average;
        let voteColor = '';
        if(vote <= 3.5) {
            voteColor = 'red';
        } else if(vote <= 7) {
            voteColor = 'yellow';
        } else { 
            voteColor = 'green' 
        }
        if(Number.isInteger(vote) && vote !== 10) {
            vote = vote + '.0';
            data.vote_average = vote;
        }
        data.vote_color = voteColor;
        for(let g=0; g<data.genres.length; g++) {
            if(g<1) {
                data.genres[g].color = Math.floor(Math.random() * 5);         
            } 
            else {
                data.genres[g].name = '';
            }
        }
        return data;
    }
    closeDetails = () => {
        this.props.closePopup();
    }
    similar = () => {
        if(this.state.media_type === 'movie') {
            this.props.similarName(this.state.movieDetails.title);
        } else if(this.state.media_type === 'tv') {
            this.props.similarName(this.state.movieDetails.name);
        }
        this.setState({redirectSimilar: true});
        this.props.searchTerm(this.props.id);
    }
    clickOff = e => {
        if(e.target.id === 'details-component') {this.closeDetails()}
    }
    render() {
        let {media_type, movieDetails, redirectSimilar} = this.state;
        if(redirectSimilar) {
            if(window.location.pathname.includes('search')) {
              //window.location.reload();
            }
            return <Redirect to={'/similar/'+this.props.media_type+'/'+this.props.id} />
        }
        return (
            <div id='details-component' onClick={this.clickOff}>
                <div id='details-box-outer'>
                {media_type === 'movie' ?
                    <div id='details-box-movie'>
                        <img id='details-backdrop' src={'https://image.tmdb.org/t/p/w500'+movieDetails.backdrop_path} alt='backdrop'></img>
                        <div id='details-box-close' onClick={this.closeDetails}><i className="fas fa-times"></i></div>
                        <div id='details-header-row'>
                            <img src={'https://image.tmdb.org/t/p/w500'+movieDetails.poster_path} alt='backdrop'></img>
                            <div>
                                <h2>{movieDetails.title}</h2>
                                <p>{movieDetails.tagline}</p>
                                <p>{movieDetails.runtime.hours}{movieDetails.runtime.minutes} minutes</p>
                                <div id='details-header-subrow'>
                                    <p>
                                        <span className={'app-movie-vote-'+movieDetails.vote_color}>
                                            {movieDetails.vote_average}
                                        </span>  
                                        {movieDetails.vote_count+' reviews'}
                                    </p>
                                    {movieDetails.imdb_id !== null ?
                                        <a id='details-imdb-link' href={'https://www.imdb.com/title/'+movieDetails.imdb_id} target='_blank' rel='noreferrer'><i className="fab fa-imdb"></i></a>
                                    : null}
                                    <div className='details-genre-box'>
                                        {movieDetails.genres.map((genre, index) =>(
                                            <a href={'/genre/movie/'+genre.id} key={index}><p className={'app-genre-'+genre.color}>{genre.name}</p></a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div> 
                        <p>{movieDetails.overview}</p>
                        <div className='details-button-box'>
                            <button className='details-similar-button' onClick={this.similar}>Similar Movies</button>
                            <button className='details-favorites-button'>Add to Favorites <i className="far fa-star"></i></button>
                        </div>
                    </div>
                : '' }
                {media_type === 'tv' ?
                    <div id='details-box-movie'>
                            <img id='details-backdrop' src={'https://image.tmdb.org/t/p/w500'+movieDetails.backdrop_path} alt='backdrop'></img>
                            <div id='details-box-close' onClick={this.closeDetails}><i className="fas fa-times"></i></div>
                            <div id='details-header-row'>
                                <img src={'https://image.tmdb.org/t/p/w500'+movieDetails.poster_path} alt='backdrop'></img>
                                <div>
                                    <h2>{movieDetails.name}</h2>
                                    <p>{movieDetails.tagline}</p>
                                    <p>{movieDetails.episode_run_time[0]} minute episodes</p>
                                    <div id='details-header-subrow'>
                                        <p>TV Show</p>
                                        <p>
                                            <span className={'app-movie-vote-'+movieDetails.vote_color}>
                                                {movieDetails.vote_average}
                                            </span>  
                                            {movieDetails.vote_count+' reviews'}
                                        </p>
                                        <a id='details-imdb-link' href={'https://www.imdb.com/title/'+movieDetails.imdb_id} target='_blank' rel='noreferrer'><i className="fab fa-imdb"></i></a>
                                        <div className='details-genre-box'>
                                        {movieDetails.genres.map((genre, index) =>(
                                            <a href={'/genre/tv/'+genre.id} key={index}><p className={'app-genre-'+genre.color}>{genre.name}</p></a>
                                        ))}
                                    </div>
                                    </div>
                                </div>
                            </div> 
                            <p>{movieDetails.overview}</p>
                            <div className='details-button-box'>
                                <button className='details-similar-button' onClick={this.similar}>Similar Shows</button>
                                <button className='details-favorites-button'>Add to Favorites <i className="far fa-star"></i></button>
                            </div>
                        </div>
                    : '' } 
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
        searchTerm: data => dispatch({ type: 'CHANGE_TERM', payload: data }),
        similarName: data => dispatch({ type: 'SIMILAR_NAME', payload: data}),
        closePopup: () => dispatch({ type: 'CLOSE_POPUP'})
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Details);