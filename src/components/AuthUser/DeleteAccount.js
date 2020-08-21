import React, { Component } from 'react';
import firebase from "../FirebaseConfig";
import SideNav from "../SideNav";
import Header from "../Header";
import Footer from "../Footer";

class DeleteAccount extends Component {
    deleteAccount() {
        var user = firebase.auth().currentUser;
        user.delete()
          .then(function () {
            localStorage.clear();
            window.location.reload(false);
            window.location.replace("/")
          })
          .catch(function (error) {
            window.alert(error.message)
          });
      }
    render() { 
        return (
          <>
            <Header/>
            <SideNav/>
            <section>
                <div className="deleteaccount-container">
                <p>Är du säker att du ska radera ditt konto?</p>
                 <button className="btn-delete" onClick={this.deleteAccount.bind(this)}>Redera konto</button>
                </div>
            </section>
            <Footer/>
          </>
         );
    }
}
 
export default DeleteAccount;