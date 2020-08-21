// register och login
import React, { Component } from "react";
import axios from "axios";
import "../../style/_loginform.scss";
import {FaUserAlt} from "react-icons/fa"

class AdminLogin extends Component {
  state = {
      condition:true,
      error1:null,
      error2:null
  };
  changeState(e){
      this.setState(prevState=>({
          condition:!prevState.condition
      }))
      e.target.innerHTML= this.state.condition ? "Already have an account?" : "Do not have an account?"
  }

  onSubmitRegister(e){
      e.preventDefault();
    axios
    .post('http://localhost:1337/auth/local/register', {
      username: e.target.elements.username.value,
      email: e.target.elements.email.value,
      password:e.target.elements.password.value
    })
    .then(response => {
      // Handle success.
      console.log('Well done!');
      console.log('User profile', response.data.user);
      console.log('User token', response.data.jwt);
      let role=response.data.user.role.name
      if(role!=="Admin"){
        this.setState({
          error2:"Du har registrerats nu. Kontakta Kundservice för att få behörighet att komma in till admin dashboard."
        })
      }else{
        let token=response.data.jwt
        let username=response.data.user.username
        this.props.callbackFromParent(token, username, role)
      }
    })
    .catch(error => {
      // Handle error.
      console.log('An error occurred:', error);
    });
  }

  onSubmitLogin(e){
    e.preventDefault();
    axios
    .post('http://localhost:1337/auth/local', {
      identifier: e.target.elements.email.value,
      password: e.target.elements.password.value,
    })
    .then(response => {
      // Handle success.
      console.log('Well done!');
      console.log('User profile', response.data.user);
      console.log('User token', response.data.jwt);
      let role=response.data.user.role.name
      if(role==="Admin"){
        let token=response.data.jwt
        let username=response.data.user.username
        this.props.callbackFromParent(token, username, role)
        console.log(role)
      }else{
        this.setState({
          error1:"Du är inte admin"
        })
      }
    })
    .catch(error => {
      // Handle error.
      console.log('An error occurred:', error);
    });
  }

  render() {
    return (
      <div className="loginform-container">
        {this.state.condition 
        ? <div>
              <p className="error">{this.state.error1}</p>
              <p>Logga in till admin dashboard!</p>
              <form className="login-form" onSubmit={this.onSubmitLogin.bind(this)}>
                <FaUserAlt/><br/>
                <input type="email" name="email" /><br/>
                <input type="password" name="password" /><br/>
                <button>Logga in</button><br/>
              </form> 
          </div>
        : <div>
              <p>Registrera!</p>
              <p className="error">{this.state.error2}</p>
              <form className="register-form" onSubmit={this.onSubmitRegister.bind(this)}>
                  <input type="text" name="username" /><br/>
                  <input type="email" name="email" /><br/>
                  <input type="password" name="password" /><br/>
                  <button>Registrera</button><br/>
              </form>
        </div>
        }
        <button className="btn-change" onClick={this.changeState.bind(this)}>Do not have an account?</button>
      </div>
    );
  }
}

export default AdminLogin;
