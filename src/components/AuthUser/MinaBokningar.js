import React, { Component } from "react";
import "../../style/_bokningar.scss";
import BokningCard from "../BokningCard";
import Header from "../Header";
import Footer from "../Footer";
import SideNav from "../SideNav";
import firebase from "../FirebaseConfig";

class MinaBokningar extends Component {
  state = {
    bookings: [],
  };
  componentDidMount() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          var userid = user.uid;
          const db = firebase.firestore();
          db.collection("booking")
            .where("userid", "==", userid)
            .where("status", "==", "booked")
            .onSnapshot((snapshot) => {
              let changes = snapshot.docChanges();
              changes.forEach((change) => {
                console.log(change.doc.data());
              });

              this.setState({
                bookings: changes,
              })
            });
        } else {
          alert("Du har inte loggat in än!");
        }
      }.bind(this)
    );
  }

  render() {
    return (
      <>
        <Header />
        <SideNav />
        <section >
          <div className="bokningar-container">
          <>
            {this.state.bookings.map((booking) => (
              <BokningCard
                key={booking.doc.id}
                id={booking.doc.id}
                name={booking.doc.data().name}
                firstName={booking.doc.data().firstName}
                familyName={booking.doc.data().familyName}
                price={booking.doc.data().price}
                datum={booking.doc.data().date}
                tid={booking.doc.data().time}
                phoneNumber={booking.doc.data().phoneNumber}
              />
              ))}
            </>
          </div>
        </section>
        <Footer />
      </>
    );
  }
}

export default MinaBokningar;
