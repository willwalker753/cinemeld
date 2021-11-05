import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import axios from 'axios';
import { checkForPoster, movieDataConverter } from '../../util/handleMoshowData';
import apiURL from '../../util/apiURL';
import Nav from '../../nav/Nav';
import Details from '../../details/Details';
import Loading from '../../loading/Loading';
import MoshowList from '../../moshowList/MoshowList';

class Similar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      moshowData: [],
      id: '',
      page: 1,
      hasMore: true,
      detailsMediaType: '',
      detailsId: '',
    }
    this.getMoreData = this.getMoreData.bind(this);
    this.moshowClick = this.moshowClick.bind(this);
  }
  async componentDidMount() {
    this.props.closePopup();
    this.getMoreData();
    this.getMoreData();
  }
  componentDidUpdate(oldProps) {
    if(oldProps.term !== this.props.term) {
      document.getElementById('loading-component').classList.add('hidden');
      this.setState({
        moshowData: [],
        page: 1
      })
      this.componentDidMount()
    }
  }
  getMoreData() {
    if(this.state.page < 50) {
      axios.get(apiURL()+'/similar?type='+this.props.match.params.type+'&id='+this.props.match.params.id+'&page='+this.state.page)
      .then(res => {
        let rawMoshowData = checkForPoster(res.data.results);
        let newMoshowData = movieDataConverter(rawMoshowData);
        let moshowData = this.state.moshowData;
        moshowData = moshowData.concat(newMoshowData);
        let nextPage = this.state.page + 1;
        this.setState({ 
          moshowData: moshowData,
          page: nextPage
        });
        if(!document.getElementById('loading-component').classList.contains('hidden')) {
          document.getElementById('loading-component').classList.add('hidden');
        }
        if(document.getElementById('app-title').classList.contains('hidden')) {
          document.getElementById('app-title').classList.remove('hidden');
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
    let { moshowData, hasMore } = this.state;
    return (
      <>
        <Nav />
        <h2 id='app-title' className='hidden'>Similar to {this.props.similar.name}</h2>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Similar));