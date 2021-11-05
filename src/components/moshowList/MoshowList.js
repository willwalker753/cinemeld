import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import "./moshowList.css"

// Yeah you read that right, Moshow. No idea what to call something that can be a movie or tv show. So Moshow it is

class MoShowList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            moshowData: []
        }
    }

    componentDidMount() {
        this.setState({ moshowData: this.props.moshowData})
    }

    componentDidUpdate(oldProps) {
        if(this.props !== oldProps) {
            this.setState({ moshowData: this.props.moshowData})
        }
    }

    render() {
        const { moshowData } = this.state;

        if(moshowData !== []) {
            return (
                <>
                    <InfiniteScroll
                        dataLength={this.state.moshowData.length}
                        next={this.props.getMoreData}
                        hasMore={this.props.hasMore}
                        loader={<></>}
                    >
                        <div className='app-movie-box'>
                            <div className='app-img-box'>
                                {moshowData.map((movie, index) => (
                                    <img 
                                    key={index} 
                                    className ='app-movie' 
                                    src={'https://image.tmdb.org/t/p/w500'+movie.poster_path} 
                                    alt={movie.title}>
                                    </img>
                                ))}
                            </div>
                            <div className='app-overlay-box'>
                                {moshowData.map((movie, index) => (
                                    <div key={index} className ='app-overlay hidden-movie' onClick={() => this.props.moshowClick(movie.media_type, movie.id)}>
                                        <h3>{movie.title}</h3>
                                        <p className='app-movie-date'>{movie.release_date}</p>
                                        <p>
                                            <span className={'app-movie-vote-'+movie.vote_color}>
                                            {movie.vote_average}
                                            </span>  
                                            {movie.vote_count+' reviews'}
                                        </p>
                                        <div className='app-genre-box'>
                                            {movie.genre_ids.map((genre, index) => (
                                                <p key={index} className={'app-genre-'+genre.color}>{genre.name}</p>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>       
                        </div>
                    </InfiniteScroll>
                </>
            );
        }
       
    }
}

export default MoShowList;