import React, { Component } from "react";
import "./../style/_bokningar.scss";
import Header from "./Header";
import Footer from "./Footer";
import SideNav from "./SideNav";
import firebase from "./FirebaseConfig";

class ReBook extends Component {

  state = {
    booking:{},
    message:""
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          var product_id=localStorage.getItem("product_id")
          const db = firebase.firestore();
          db.collection("booking").doc(product_id).get().then(booking=>{
            console.log(booking.data())
            this.setState({
                booking:booking.data()
            });
          })
        } else {
          alert("Du har inte loggat in än!");
        }
      }.bind(this)
    );
  }

  updateBooking(e){
    e.preventDefault();
    var user=firebase.auth().currentUser
    if(user){
        var product_id=localStorage.getItem("product_id")
        const db=firebase.firestore()
        const docRef=db.collection("booking").doc(product_id)
        docRef.update({
            date:e.target.elements.date.value,
            time:e.target.elements.time.value,
            firstName:e.target.elements.firstname.value,
            lastName:e.target.elements.familyname.value,
            phoneNumber:e.target.elements.telefon.value,
        })
    }
  }

  showMessage=()=>{

    this.setState({
      message:"Dina ändringar har sparats!"
    })

  }

  render() {
    return (
      <>
        <Header />
        <SideNav />
        <section >
          <div >
            <form onSubmit={this.updateBooking.bind(this)}>
                <h5>{this.state.booking.name}</h5>
                <label>Datum</label>
                <input type="date" id="date" name="date" defaultValue={this.state.booking.date}/><br/>
                <label>Tid</label>
                <input type="time" id="time" name="time" defaultValue={this.state.booking.time}></input>
                <input type="text" name="firstname" defaultValue={this.state.booking.firstName}></input><br />
                <input type="text" name="familyname"  defaultValue={this.state.booking.familyName}></input><br />
                <input type="number" name="telefon" defaultValue={this.state.booking.phoneNumber}></input><br />
                <button onClick={this.showMessage} className="btn">Ändra</button>

                <p>{this.state.message}</p>
            </form>
          </div>
        </section>
        <Footer />
      </>
    );
  }
}

export default ReBook;
