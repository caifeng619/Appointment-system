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
    message:""
  };

  // snapshotToArray=snapshot=>{

  //   let returnArr=[]
  //   snapshot.forEach(childSnapshot=>{
  //     let item = childSnapshot.val();
  //     item.key = childSnapshot.key;
  //     returnArr.push(item);
  //   })
  //   return returnArr;
  // }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          var userid = user.uid;
          const db = firebase.firestore();
          db.collection("booking")
            .where("userid", "==", userid)
            .where("status", "==", "booked")
            .get()
            .then(snapshot=>{
              // if(snapshot.empty){
              //   this.setState({
              //     message:"Du har ingen bokningar!"
              //   })
              //   return
              // }
              console.log(snapshot)
              let returnArr=[]
              snapshot.forEach(doc=>{
                let item=doc.data()
                item.key=doc.id
                returnArr.push(item)
                
                console.log(doc.id, "=>", doc.data())})
                this.setState({
                  bookings:returnArr
                })
                // console.log(returnArr[0].key)
            })
        } else {
          alert("Du har inte loggat in än!")}
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
            {this.state.bookings.map((booking) =>
               <BokningCard
                key={booking.key}
                id={booking.key}
                name={booking.name}
                firstName={booking.firstName}
                familyName={booking.familyName}
                price={booking.price}
                datum={booking.date}
                tid={booking.time}
                phoneNumber={booking.phoneNumber}
              />
              )}
            </>
          </div>
        </section>
        <Footer />
      </>
    );
  }
}

export default MinaBokningar;
