import React, { Component } from "react";
import "../../style/_loginform.scss";
import firebase from "../FirebaseConfig";
import SideNav from "../SideNav";
import Header from "../Header";
import Footer from "../Footer";

class ResetPassword extends Component {
  state = {
    error:""
  };

  changePassword(e) {
    e.preventDefault();
    const oldpassword=e.target.elements.oldpassword.value;
    const newpassword=e.target.elements.password1.value;
    const confirmednewpassword=e.target.elements.password2.value;

    var user = firebase.auth().currentUser;
    var credential=firebase.auth.EmailAuthProvider.credential(
      user.email,
      oldpassword
    )
    console.log(credential)
    user.reauthenticateWithCredential(credential).then(function(){
      console.log(credential)
      if(newpassword===confirmednewpassword){

        user.updatePassword(newpassword).then(function(){

          console.log("password update successful")

        }).catch(function(error){
          window.alert(error.message)
        })
      }else{

        this.setState({
          error:"lösnord matchar inte!"
        })
      }
    }).catch(function(error){
      window.alert(error.message)
    })
    
  }

  render() {
    return (
      <React.Fragment>
        <Header/>
        <SideNav/>
        <section>
          <h4>Ändra lösenord</h4>
          <form id="change-password-form" onSubmit={this.changePassword.bind(this)} className="login-form">
            <label>Nuvanrande lösenord</label>
            <input type="password" name="oldpassword"></input>
            <label>Nytt lösenord</label>
            <input type="password" name="password1"></input>
            <label>Bekräfta nytt lösenord</label>
            <input type="password" name="password2"></input>
            <button className="btn-delete">ändra</button>
          </form>
        </section>
      <Footer/>
      </React.Fragment>
    );
  }
}

export default ResetPassword;
