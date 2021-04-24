import { Component } from 'react';
import { connect } from 'react-redux';
import './signupInfo.css';

class SignupInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.close = this.close.bind(this);
        this.clickOff = this.clickOff.bind(this);
    }
    close = () => {
        this.props.closePopup();
    }
    clickOff = e => {
        if(e.target.id === 'signup-info-outer') {this.close()}
    }
    render() {
        return (
            <div id='signup-info-outer' onClick={this.clickOff}>
                <div id='signup-info-inner'>
                    <div id='signup-info-close' onClick={this.close}>
                        <i className="fas fa-times"></i>
                    </div> 
                    <i id='signup-info-checkmark' className="far fa-check-circle"></i>
                    <h2>Thank you for signing up {this.props.account.username}!</h2>
                    <p>
                        We have sent an email verification link to {this.props.account.email}. 
                        Verifying your email is needed before resetting your password 
                        so we know the email is going to the right place. 
                        Make sure to check your spam folder😊
                    </p>
                    <a href='/account'><button>Continue to Account Home</button></a>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { account } = state;
    return { account };
}
  
const mapDispatchToProps = dispatch => {
    return {
        closePopup: () => dispatch({ type: 'CLOSE_POPUP'}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupInfo);