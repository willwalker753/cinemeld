import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../nav/Nav';
import Details from '../details/Details';
import Loading from '../loading/Loading';
import MoshowList from '../moshowList/MoshowList';
import axios from 'axios';
import apiURL from '../util/apiURL';
import { checkForPoster, movieDataConverter } from '../util/handleMoshowData';
import './home.css';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      moshowData: [],
      page: 1,
      detailsMediaType: '',
      detailsId: ''
    }
    this.getMoreData = this.getMoreData.bind(this);
    this.moshowClick = this.moshowClick.bind(this);
  }

  async componentDidMount() {
    await this.getMoreData();
    await this.getMoreData();
  }

  getMoreData = async () => {
    let page = this.state.page;
    await axios.get(`${apiURL()}/home?page=${page}`)
      .then(res => {
        let rawMoshowData = checkForPoster(res.data)
        let newMoshowData = movieDataConverter(rawMoshowData)
        let currentMoshowData = this.state.moshowData;
        let moshowData = currentMoshowData.concat(newMoshowData)
        let nextPage = page + 1;
        this.setState({ 
          moshowData: moshowData,
          page: nextPage
        });
      })
      .catch(error => {
        console.error(error)
      })
    
  }

  moshowClick = (media_type, id) => {
    this.setState({
      detailsMediaType: media_type,
      detailsId: id,
    });
    this.props.showDetails();
  }

  render() {
    let { moshowData } = this.state;
    return (
      <>
        <Nav />
        <h2 id='app-title'>Popular Movies Now</h2>
        {moshowData !== [] ?
          <MoshowList moshowData={moshowData} getMoreData={this.getMoreData} moshowClick={this.moshowClick} hasMore={true}/>
          :
          <Loading showByDefault={true}/>
        }
        <Loading showByDefault={false}/>
        {this.props.showPopup.details ? <Details media_type={this.state.detailsMediaType} id={this.state.detailsId} /> : null}
      </>
    )
  }
}

const mapStateToProps = (state) => {
  const { account, showPopup } = state;
  return { loggedIn: account.loggedIn, showPopup };
}

const mapDispatchToProps = dispatch => {
  return {
      loggedIn: data => dispatch({ type: 'LOGGED_IN', payload: data }),
      accountId: data => dispatch({ type: 'ACCOUNT_ID', payload: data }),
      showDetails: () => dispatch({ type: 'SHOW_DETAILS'})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);