import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import "./moshowList.css"

// Yeah you read that right, Moshow. No idea what to call something that can be a movie or tv show. So Moshow it is

class MoShowList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

    componentDidMount() {
        console.log(this.props)
    }

    render() {
        return (
            <>
                {/* <h2 id='app-title' className='hidden'>Popular Movies Now</h2>
                <InfiniteScroll
                    dataLength={this.state.movieList.length}
                    next={this.getMoreData}
                    hasMore={true}
                    loader={<></>}
                >
                    <div className='app-movie-box'>
                        <div className='app-img-box'>
                        {movieList.map((movie, index) => (
                            <img 
                            key={index} 
                            className ='app-movie' 
                            src={'https://image.tmdb.org/t/p/w500'+movie.poster_path} 
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
                                <p className={'app-genre-'+genre.color}>{genre.name}</p>
                                ))}
                            </div>
                            </div>
                        ))}
                        </div>       
                    </div>
                </InfiniteScroll> */}
            </>
        );
    }
}

export default MoShowList;