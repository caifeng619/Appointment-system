import React, { Component } from "react";
import "../../style/_loginform.scss";
import firebase from "../FirebaseConfig";
import Header from "../Header";
import Footer from "../Footer";


class ResetPassword extends Component {
  state = {};

  resetPassword(e) {
    e.preventDefault();
    var auth = firebase.auth();
    var emailAddress = e.target.elements.resetEmail.value;

    auth
      .sendPasswordResetEmail(emailAddress)
      .then(function () {
        // Email sent.
      })
      .catch(function (error) {
        // An error happened.
      });
  }

  render() {
    return (
      <React.Fragment>
        <Header/>
        <div className="loginform-container">
          <form id="reset-form" onSubmit={this.resetPassword.bind(this)} className="login-form">
            <p>
              Ange den e-postadress som du använde för att skapa ditt konto, så
              skickar vi dig en länk för att återställa lösenordet.
            </p>
            <input type="email" name="resetEmail"  placeholder="E-postadress"></input>
            <button>Skicka</button>
          </form>
        </div>
      <Footer/>
      </React.Fragment>
    );
  }
}

export default ResetPassword;
