import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from "./FirebaseConfig";

class Card extends Component {
    SaveToFireStore(){
        var user=firebase.auth().currentUser
        if(user){
            var userid=user.uid
            console.log(userid)
            const {name, description, price}=this.props
            const docRef=firebase.firestore().collection("booking")
    
            docRef.add({
                userid,
                name,
                description,
                price,
                status:"isbooking"
            }).then(res=>{
                console.log(res.id)
                localStorage.setItem("product_id", res.id)
                window.location.replace("/tid")
            })

            
            
        }else{
            alert("Vänligen logga in först för att boka en tid.")
        }

    }
    render() {
        const { name, description, image, price } = this.props
        return (
                <div className={"card"}>
                    <img src={image} className={"card-img-top"} alt={name} />
                    <div className={"card-body"}>
                        <h5 className={"card-title"}>{name}</h5>
                        <p className={"card-text"}>{description}</p>
                        <Link to=""><button onClick={this.SaveToFireStore.bind(this)} className={"btn btn-boka"}>Boka</button></Link>
                        <span>{price} kr</span>
                    </div>
                </div>
        )
    }
}
export default Card;