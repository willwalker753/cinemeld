import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import axios from 'axios';
import apiURL from '../../util/apiURL';
import { checkForPoster, movieDataConverter } from '../../util/handleMoshowData';
import allGenreList from '../../util/constants';
import Nav from '../../nav/Nav';
import Details from '../../details/Details';
import Loading from '../../loading/Loading';
import MoshowList from '../../moshowList/MoshowList';

class Genre extends Component {
  constructor(props) {
    super(props)
    this.state = {
      moshowData: [],
      id: '',
      type: '',
      page: 1,
      hasMore: true,
      detailsMediaType: '',
      detailsId: '',
      genreName: ''
    }
    this.getMoreData = this.getMoreData.bind(this);
    this.moshowClick = this.moshowClick.bind(this);
  }

  async componentDidMount() {
    this.props.closePopup();
    this.getMoreData();
    this.getMoreData();
    for(let i=0; i<allGenreList.allGenreList.length; i++) {
      if(allGenreList.allGenreList[i].id.toString() === this.props.match.params.id) {
        this.setState({ genreName: allGenreList.allGenreList[i].name})
        break;
      }
    }
  }

  componentDidUpdate(oldProps) {
    // why does it say term here, not type or id? May be an error from copying name search
    if(oldProps.term !== this.props.term) {
      this.componentDidMount()
    }
  }

  getMoreData() {
    if(this.state.page < 50) {
      axios.get(apiURL()+'/genre?id='+this.props.match.params.id+'&type='+this.props.match.params.type+'&page='+this.state.page)
      .then(res => {
        let rawMoshowData = checkForPoster(res.data);
        let newMoshowData = movieDataConverter(rawMoshowData);
        let moshowData = this.state.moshowData;
        moshowData = moshowData.concat(newMoshowData);
        let nextPage = this.state.page + 1;
        this.setState({ 
          moshowData: moshowData,
          page: nextPage
        });
        if(!document.getElementById('loading-component').classList.contains('hidden')) {
          document.getElementById('app-title').classList.remove('hidden');
          document.getElementById('loading-component').classList.add('hidden');
        }
      })
      .catch(error => {
        if(error.repsonse.status === 404) {
          this.setState({ hasMore: false})
        }
      })
    }
  }

  moshowClick = (media_type, id) => { 
    this.setState({
      detailsMediaType: media_type,
      detailsId: id,
    });
    this.props.showDetails();
  }
  
  render() {
    let { moshowData, hasMore, genreName } = this.state;
    return (
      <>
        <Nav />
        <h2 id='app-title' className='hidden'>Results for {genreName} {this.props.match.params.type === 'movie' ? 'Movies': 'TV Shows'}</h2>
        {moshowData !== [] ?
          <MoshowList moshowData={moshowData} getMoreData={this.getMoreData} moshowClick={this.moshowClick} hasMore={hasMore}/>
          :
          <Loading showByDefault={true}/>
        }
        <Loading showByDefault={true}/>
        {this.props.showPopup.details ? <Details media_type={this.state.detailsMediaType} id={this.state.detailsId} /> : null}
      </>
    )
  }
}

const mapStateToProps = (state) => {
  const { mediaType, termName, showPopup } = state;
  return { media: mediaType, term: termName, showPopup };
}

const mapDispatchToProps = dispatch => {
  return {
      changeMedia: data => dispatch({ type: 'CHANGE_MEDIA', payload: data }),
      searchTerm: data => dispatch({ type: 'CHANGE_TERM', payload: data }),
      closePopup: () => dispatch({ type: 'CLOSE_POPUP' }),
      showDetails: () => dispatch({ type: 'SHOW_DETAILS'})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Genre));