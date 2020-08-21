import React, { Component } from "react";
import firebase from "../FirebaseConfig";
import SideNav from "../SideNav";
import Header from "../Header";
import Footer from "../Footer";

class UserInfo extends Component {

  state={
    name:"",
    email:"",
    emailVerified:false
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(function(user){
      if(user){
        this.setState({
          name:user.displayName,
          email:user.email,
          emailVerified:user.emailVerified
        })
      }
    }.bind(this));
  }
  onSubmitSaveUserinfo(e){
    e.preventDefault()
    var user = firebase.auth().currentUser
    console.log(user.password)
    let email=e.target.elements.email.value
    let password=e.target.elements.password.value


    user.updateProfile({
      displayName:e.target.elements.name.value,
    }).then(function() {
      console.log("Update displayname successful.")
    }).catch(function(error) {
      console.log(error)
    });

    
    const credential=firebase.auth.EmailAuthProvider.credential(user.email, password)
    user.reauthenticateWithCredential(credential).then(function() {
        user.updateEmail(email).then(function(){
          console.log("update email successful.")
        }).catch(function(error) {
          console.log(error)
        });
    }).catch(function(error) {
      console.log(error)
    });

  }
  render() {
    const{displayName}=this.props
    return (
      <div>
        <Header/>
        <SideNav/>
        <section className="userinfo-container">
          <h4>Mina uppgifter</h4>
          <form onSubmit={this.onSubmitSaveUserinfo.bind(this)}>
            <label htmlFor="name">Avändaresnamn</label>
            <input type="text" name="name" defaultValue={displayName || this.state.name}/><br/>
            <label htmlFor="name">E-postadress</label>
            <input type="text" name="email" defaultValue={this.state.email}/><br/>
            <p>Epost verifierad: {this.state.emailVerified ? "True" : "False"}</p>
            <label>Fyll in lösenord för att spara dina ändringar!</label>
            <input type="password" name="password"></input>
            <button className="btn">Spara</button>
          </form>
        </section>
        <Footer/> 
      </div>
    );
  }
}

export default UserInfo;
