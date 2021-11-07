import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import axios from 'axios';
import { checkForPoster, movieDataConverter } from '../../util/handleMoshowData';
import apiURL from '../../util/apiURL';
import Nav from '../../nav/Nav';
import Details from '../../details/Details';
import Loading from './../../loading/Loading';
import MoshowList from '../../moshowList/MoshowList';
import './textSearch.css';

class TextSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      moshowData: [],
      page: 1,
      hasMore: true,
      detailsMediaType: '',
      detailsId: '',
      noResults: false
    }
    this.getMoreData = this.getMoreData.bind(this);
    this.moshowClick = this.moshowClick.bind(this);
  }

  async componentDidMount() {
    document.getElementById('loading-component').classList.remove('hidden');
    this.props.closePopup();
    if(this.props.match.params.term !== '') {
      await this.getMoreData();
      await this.getMoreData();    
    }
  }

  componentDidUpdate(oldProps) {
    if(oldProps.match.params.term !== this.props.match.params.term) {
      this.setState({
        moshowData: [],
        page: 1
      })
      setTimeout(function(){ this.componentDidMount() }.bind(this), 150);
    }
  }

  async getMoreData() {
    if(this.state.page < 50) {
      await axios.get(apiURL()+'/search?term='+this.props.match.params.term+'&page='+this.state.page)
      .then(res => {
        console.log(res.data)
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
        console.error(error)
        if(error.response && error.repsonse.status === 404) {
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
    let { moshowData, hasMore, noResults } = this.state;
    return (
      <>
        <Nav />
        <h2 id='app-title' className='hidden'>Search Results for {this.props.match.params.term}</h2>
        {noResults ? 
          <div id='no-seach-results'>
            <p>Oops we didn't find any results for "{this.props.match.params.term}"</p>
            <button onClick={this.props.showSearch}><i className="fas fa-search"></i> Search for something else?</button>
          </div> 
        : null}
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
      showDetails: () => dispatch({ type: 'SHOW_DETAILS'}),
      showSearch: () => dispatch({ type: 'SHOW_SEARCH' })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TextSearch));