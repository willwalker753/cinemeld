import { Component } from 'react';
import axios from 'axios';
import './account.css';

export default class Account extends Component {
    constructor(props) {
        super(props)
        this.state = {
            login: true,
            hidePassword: 'password',
            eyeIcon: 'fas fa-eye',
            username: '',
            email: '',
            password: '',
            passwordRep: ''
        }
        this.toggleLogin = this.toggleLogin.bind(this);
        this.textChange = this.textChange.bind(this);
        this.hidePassword = this.hidePassword.bind(this);
        this.unhidePassword = this.unhidePassword.bind(this);
    }
    toggleLogin = () => {
        this.setState({ login: !this.state.login })
    }
    textChange = e => {
        console.log(e.target.value)
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
    render() {
        return (
            <div id='account-box-outer'>
                <div id='account-box-inner'>
                    
                    {this.state.login ? 
                        <form>
                            <h2>Login</h2>
                            <p>Username or Email</p>
                            <input onChange={this.textChange} type='text' placeholder='myemail@gmail.com'></input>
                            <p>Password</p>
                            <div>
                                <input onChange={this.textChange} type={this.state.hidePassword} placeholder='At least 6 characters'></input>
                                <i className={this.state.eyeIcon} onMouseEnter={this.unhidePassword} onMouseLeave={this.hidePassword}></i>
                            </div>
                            
                            <input type='submit' value='Login'></input>
                        </form>
                        :
                        <form>
                            <h2>Sign Up</h2>
                            <p>Email</p>
                            <input onChange={this.textChange} type='email' placeholder='myemail@gmail.com'></input>
                            <p>Username</p>
                            <input onChange={this.textChange} type='text' placeholder='myname007'></input>
                            <p>Password</p>
                            <div>
                                <input onChange={this.textChange} type={this.state.hidePassword} placeholder='At least 6 characters'></input>
                                <i className={this.state.eyeIcon} onMouseEnter={this.unhidePassword} onMouseLeave={this.hidePassword}></i>
                            </div>
                            <div>
                                <input onChange={this.textChange} type={this.state.hidePassword} placeholder='Repeat password'></input>
                            </div>
                            <input type='submit' value='Sign Up'></input>
                        </form>
                    }
                    {!this.state.login ? <button onClick={this.toggleLogin}>Nevermind I have an account</button>: <button onClick={this.toggleLogin}>I want to sign up instead</button>}
                </div>
            </div>
        );
    }
}