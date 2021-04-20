import { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import apiURL from './util/apiURL';
import './account.css';

class Account extends Component {
    constructor(props) {
        super(props)
        this.state = {
            noUsername: false,
            noEmail: false,
            noPassword: false,
            noRepeatPassword: false,
            passwordDontMatch: false,
            invalidLogin: false,
            emailTaken: false,
            usernameTaken: false,
            login: true,
            hidePassword: 'password',
            eyeIcon: 'fas fa-eye',
            username: '',
            email: '',
            password: '',
            passwordRepeat: ''
        }
        this.toggleLogin = this.toggleLogin.bind(this);
        this.textChange = this.textChange.bind(this);
        this.hidePassword = this.hidePassword.bind(this);
        this.unhidePassword = this.unhidePassword.bind(this);
        this.clickOff = this.clickOff.bind(this);
        this.closeAccount = this.closeAccount.bind(this);
        this.login = this.login.bind(this);
    }
    toggleLogin = () => {
        this.setState({ login: !this.state.login })
    }
    textChange = e => {
        switch(e.target.id) {
            case('account-username-input'): this.setState({ username: e.target.value});
                break;
            case('account-email-input'): this.setState({ email: e.target.value});
                break;
            case('account-password-input'): this.setState({ password: e.target.value});
                break;
            case('account-repeat-password'): this.setState({ passwordRepeat: e.target.value});
                break;
            default:
                break;
        }
    }
    unhidePassword = () => {
        this.setState({
            hidePassword: 'text',
            eyeIcon: 'fas fa-eye-slash'
        });
    }
    hidePassword = () => {  
        this.setState({
            hidePassword: 'password',
            eyeIcon: 'fas fa-eye'
        });
    }
    closeAccount = () => {
        this.props.closePopup();
    }
    clickOff = e => {
        if(e.target.id === 'account-box-outer') {this.closeAccount()}
    }
    login = e => {
        e.preventDefault();
        this.setState({
            noUsername: false,
            noEmail: false,
            noPassword: false,
            noRepeatPassword: false,
            passwordDontMatch: false,
            invalidLogin: false,
            emailTaken: false,
            usernameTaken: false
        });
        axios.post(apiURL() + '/user/login', {
            username: this.state.username,
            password: this.state.password
        })
        .then(res => {
            console.log(res)
            if(Array.isArray(res.data)) {
                if(res.data.includes('username_empty')) { this.setState({ noUsername: true }) }
                if(res.data.includes('password_empty')) { this.setState({ noPassword: true }) }
                if(res.data.includes('no_match')) { this.setState({ invalidLogin: true }) }
            }
        })
    }
    signUp = e => {
        e.preventDefault();
        this.setState({
            noUsername: false,
            noEmail: false,
            noPassword: false,
            noRepeatPassword: false,
            passwordDontMatch: false,
            invalidLogin: false,
            emailTaken: false,
            usernameTaken: false
        });
        if(this.state.password !== this.state.passwordRepeat) { this.setState({ passwordDontMatch: true }) }
        else {
            axios.post(apiURL() + '/user/signup', {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            })
            .then(res => {
                console.log(res)
                if(Array.isArray(res.data)) {
                    if(res.data.includes('username_empty')) { this.setState({ noUsername: true }) }
                    if(res.data.includes('password_empty')) { this.setState({ noPassword: true }) }
                    if(res.data.includes('email_empty')) { this.setState({ noEmail: true }) }
                    if(res.data.includes('username_taken')) { this.setState({ usernameTaken: true }) }
                    if(res.data.includes('email_taken')) { this.setState({ emailTaken: true }) }
                }
            })
        }  
    }
    render() {
        return (
            <div id='account-box-outer' onClick={this.clickOff}>
                <div id='account-box-inner'>
                    <i onClick={this.closeAccount}className="fas fa-times"></i>
                    {this.state.login ? 
                        <form onSubmit={this.login}>
                            <h2>Login</h2>
                            <p>Username or Email</p>
                            <input className='account-text-input' autoComplete='off' id='account-username-input' onChange={this.textChange} type='text' placeholder=''></input>
                            <div id='account-password'>
                                <p>Password</p>
                                <p>Forgot your password?</p>
                            </div>
                            
                            <div className='account-password-input'>
                                <input className='account-text-input' autoComplete='off' id='account-password-input' onChange={this.textChange} type={this.state.hidePassword} placeholder=''></input>
                                <i className={this.state.eyeIcon} onMouseEnter={this.unhidePassword} onMouseLeave={this.hidePassword}></i>
                            </div>
                            <div id='account-error-msg'>
                                {this.state.noUsername ? <p><i className="fas fa-exclamation-circle"></i> Username or email is required</p> : null}
                                {this.state.noPassword ? <p><i className="fas fa-exclamation-circle"></i> Password is required</p> : null}
                                {this.state.invalidLogin ? <p><i className="fas fa-exclamation-circle"></i> Invalid login credentials</p> : null}
                            </div>
                            <div className='account-submit'>
                                <input type='submit' value='Login'></input>
                                <button onClick={this.toggleLogin}>I want to sign up instead</button>  
                            </div>
                            
                        </form>
                        :
                        <form onSubmit={this.signUp}>
                            <h2>Sign Up</h2>
                            <p>Email</p>
                            <input className='account-text-input' autoComplete='off' id='account-email-input' onChange={this.textChange} type='email' placeholder='myemail@gmail.com'></input>
                            <p>Username</p>
                            <input className='account-text-input' autoComplete='off' id='account-username-input' onChange={this.textChange} type='text' placeholder='myname007'></input>
                            <p>Password</p>
                            <div className='account-password-input'>
                                <input className='account-text-input' autoComplete='off' id='account-password-input' onChange={this.textChange} type={this.state.hidePassword} defaultValue='' placeholder='At least 6 characters'></input>
                                <i className={this.state.eyeIcon} onMouseEnter={this.unhidePassword} onMouseLeave={this.hidePassword}></i>
                            </div>
                            <div>
                                <input id='account-repeat-password' autoComplete='off' className='account-text-input' onChange={this.textChange} type={this.state.hidePassword} placeholder='Repeat password'></input>
                            </div>
                            <div id='account-error-msg'>
                                {this.state.noEmail ? <p><i className="fas fa-exclamation-circle"></i> Email is required</p> : null}
                                {this.state.noUsername ? <p><i className="fas fa-exclamation-circle"></i> Username is required</p> : null}
                                {this.state.noPassword ? <p><i className="fas fa-exclamation-circle"></i> Password is required</p> : null}
                                {this.state.emailTaken ? <p><i className="fas fa-exclamation-circle"></i> Email address is already taken</p> : null}
                                {this.state.usernameTaken ? <p><i className="fas fa-exclamation-circle"></i> Username is already taken</p> : null}
                                {this.state.passwordDontMatch ? <p><i className="fas fa-exclamation-circle"></i> Passwords do not match</p> : null}
                            </div>
                            <div className='account-submit'>
                                <input type='submit' value='Sign Up'></input> 
                                <button onClick={this.toggleLogin}>Nevermind I have an account</button>   
                            </div>
                        </form>
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { showPopup } = state;
    return { showPopup };
}
  
const mapDispatchToProps = dispatch => {
    return {
        closePopup: () => dispatch({ type: 'CLOSE_POPUP'})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Account);