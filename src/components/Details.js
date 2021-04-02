import React, { Component } from 'react';
import axios from 'axios';
import apiURL from './util/apiURL';
import './details.css';

class Details extends Component {
    constructor(props) {
        super(props)
        this.state = {
            media_type: '',
            movieDetails: {}
        }
        this.formatMovieData = this.formatMovieData.bind(this);
        this.closeDetails = this.closeDetails.bind(this);
    }
    async componentWillReceiveProps() {
        await axios.get(apiURL()+'/details?type='+this.props.media_type+'&id='+this.props.id)
        .then(res => {
            let data = res.data;
            if(this.props.media_type === 'movie') {
                data = this.formatMovieData(res.data);
            }
            this.setState({ 
                media_type: this.props.media_type,
                movieDetails: data 
            });
            console.log(data)
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
        return data;
    }
    closeDetails = () => {
        document.getElementById('details-component').classList.add('hidden');
    }
    render() {
        let {media_type, movieDetails} = this.state;
        return (
            <div id='details-component' className='hidden'>
                <div id='details-box-outer'>
                {media_type === 'movie' ?
                    <div id='details-box-movie'>
                        <img id='details-backdrop' src={'https://image.tmdb.org/t/p/w500'+movieDetails.backdrop_path} alt='backdrop'></img>
                        <div id='details-header-row'>
                            <img src={'https://image.tmdb.org/t/p/w500'+movieDetails.poster_path} alt='backdrop'></img>
                            <div>
                                <h3>{movieDetails.title}</h3>
                                <p>{movieDetails.tagline}</p>
                                <p>{movieDetails.runtime} minutes</p>
                                <div id='details-header-subrow'>
                                    <p>
                                        <span className={'app-movie-vote-'+movieDetails.vote_color}>
                                            {movieDetails.vote_average}
                                        </span>  
                                        {movieDetails.vote_count+' reviews'}
                                    </p>
                                    <a id='details-imdb-link' href={'https://www.imdb.com/title/'+movieDetails.imdb_id} target='_blank'><i className="fab fa-imdb"></i></a>
                                </div>
                            </div>
                        </div> 
                        <p>{movieDetails.overview}</p>
                    </div>
                :
                ''}
                <div id='details-box-close' onClick={this.closeDetails}><i className="fas fa-times"></i></div>
                </div>
            </div>
        )
    }
}

export default Details;