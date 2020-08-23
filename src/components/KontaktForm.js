import React from "react";
import "../style/_kontaktform.scss";
import Step from "./Step";
import Header from "./Header";
import Footer from "./Footer";
import firebase from "./FirebaseConfig";

class KontaktForm extends React.Component {

    state={
        telefon:""
    }
    handleOnSubmit = e => {
        e.preventDefault();
        var user=firebase.auth().currentUser
        if(user){
            var userid=user.uid
            console.log(userid)
            const db=firebase.firestore()
            var product_id=localStorage.getItem("booking_id");
            console.log(product_id);
            const docRef=db.collection("booking").doc(product_id)
            docRef.update({
                firstName :e.target.elements.firstname.value,
                familyName :e.target.elements.familyname.value,
                phoneNumber:e.target.elements.telefon.value,
                status:"booked"
            }).then(res=>{
                console.log(res)
                window.location.replace("/success")
            })
        }else{
            console.log("error")
        }
        
    }

    render() {
        return (
            <div>
                <Header/>
                <Step />
                <div className={"form-container"}>
                    <form onSubmit={this.handleOnSubmit}>
                        <h3>Fyll forulär för att boka en tid!</h3>
                        <input type="text" name="firstname"  placeholder="ange ditt förnamn"></input><br />
                        <input type="text" name="familyname"  placeholder="ange ditt efternamn"></input><br />
                        <input type="number" name="telefon" placeholder="ange telefon nummer"></input><br />
                        <button type="submit" className="btn btn-boka">Boka</button>
                    </form>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default KontaktForm;