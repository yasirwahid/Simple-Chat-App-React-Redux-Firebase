import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signin } from '../store/actions/authaction'
import Apphistory from '../History'
import Load from '../utils/load.gif'

class Signin extends Component {
    state = {
        email: '',
        password: ''
    }
    emailFormHandler(event) {
        this.setState({
            email: event.target.value
        })
    }
    passwordFormHandler(event) {
        this.setState({
            password: event.target.value
        })
    }
    signin() {
        this.props.signinAction(this.state.email, this.state.password);
    }
    notMember(){
        Apphistory.push('./signup')
    }
    render() {
        return (
            <div class="container" >
                <h1>Hello Signin</h1>
                Email: <input type="text" name='email' value={this.state.email} onChange={this.emailFormHandler.bind(this)} /><br />
                Password: <input type="password" name='password' value={this.state.password} onChange={this.passwordFormHandler.bind(this)} /><br />
                <button onClick={this.signin.bind(this)}>Signin</button><br />
                Not a member? <button onClick={this.notMember}>Signup</button><br />
                {
                    (this.props.loader === true)?(
                        <img src={Load} className="App-logo" alt="logo" />

                    ): null
                }

            </div>
        )
    }
}

function mapStateToProps(state) {
    return ({
        loader: state.basicInfo.loader
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        signinAction: (email, password) => {
            dispatch(signin(email, password))
        }
    })
}


export default connect(mapStateToProps, mapDispatchToProps)(Signin);













































