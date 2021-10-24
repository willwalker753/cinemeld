import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from './components/Nav';
import Details from './components/Details';
import Loading from './components/Loading';
import MoshowList from './components/moshowList/MoshowList';
import { handleMoshowData } from './components/util/handleMoshowData';
import './app.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      moshowData: [],
      page: 3,
      detailsMediaType: '',
      detailsId: ''
    }
    this.getMoreData = this.getMoreData.bind(this);
    this.moshowClick = this.moshowClick.bind(this);
  }

  async componentDidMount() {
    let moshowDataPage1 = [], moshowDataPage2 = []
    await handleMoshowData({ type: "home", page: "1"})
    // .then(res => {
    //   moshowDataPage1 = res
    //   handleMoshowData({ type: "home", page: "2"})
    // })
    // .then(res => {
    //   moshowDataPage2 = res
    //   let moshowData = moshowDataPage1.concat(moshowDataPage2);
    //   this.setState({ moshowData: moshowData });
    // })
    .catch(error => {
      console.error(error)
    })
  }

  getMoreData = async () => {
    let newMoshowData = await handleMoshowData({ type: "home", page: this.state.page})
    let currentMoshowData = this.state.moshowData;
    let moshowData = currentMoshowData.concat(newMoshowData)
    let nextPage = this.state.page + 1;
    this.setState({ 
      moshowData: moshowData,
      page: nextPage
    });
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
          <MoshowList moshowData={moshowData} getMoreData={this.getMoreData}/>
          :
          <Loading />
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(App);