import React, { Component } from "react";
import Step from "./Step";
import Header from "./Header";
import Footer from "./Footer";
import "../style/_choosetime.scss";
import firebase from "./FirebaseConfig";

class ChooseTime extends Component {

    onSubmitSaveTime=(e)=>{
        e.preventDefault();
        var user=firebase.auth().currentUser
        if(user){
            var userid=user.uid
            console.log(userid)
            const db=firebase.firestore()
            var product_id=localStorage.getItem("product_id");
            console.log(product_id);
            const docRef=db.collection("booking").doc(product_id)
            docRef.update({
                date:e.target.elements.date.value,
                time:e.target.elements.time.value
            }).then(res=>{
                console.log(res)
                // window.location.replace("http://localhost:3000/form")
            })
        }else{
            console.log("error")
        }
    }
    render(){
        return (
            <div>
                <Header/>
                <Step />
                <div className="choosetime-container">
                    <form onSubmit={this.onSubmitSaveTime}>
                        <h3>Välj datum och en tid!</h3>  
                        <p>Du kan ändra eller avboka din tid utan kostnad online.</p>
                        <label>Datum</label>
                        <input type="date" id="date" name="date" defaultValue="2020-05-30"/><br/>
                        <label>Tid</label>
                        <input type="time" id="time" name="time"></input>
                        <button className="btn btn-boka">Gå vidare</button>
                    </form>
                </div>
                <Footer/>
            </div>
        )
    }
}
export default ChooseTime;