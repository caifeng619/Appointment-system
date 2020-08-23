import React from "react";
import "../style/_booksucess.scss";
import Step from "./Step";
import Header from "./Header";
import Footer from "./Footer";
import firebase from "./FirebaseConfig";

class KontaktForm extends React.Component {
    state = {
        name:"",
        date:"",
    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged(function(user){
            if(user){
                const db=firebase.firestore()
                var product_id=localStorage.getItem("booking_id")
                const docRef=db.collection("booking").doc(product_id)
                docRef.get().then(booking=>{
                    this.setState({
                        name:booking.data().name,
                        date:booking.data().date,
                        time:booking.data().time
                    })
                })
              }else{
                alert("Du har inte loggat in än!")
              }
        }.bind(this))
      }
    render() {
        return (
            <div>
                <Header/>
                <Step />
                <div className="booksuccess-container">
                     <h4>Du har bokat en tid för </h4>
                     <h4>{this.state.name} </h4>
                     <h5>{this.state.time}, {this.state.date} </h5>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default KontaktForm;