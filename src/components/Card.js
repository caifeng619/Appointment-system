import React, { Component } from "react";
import firebase from "./FirebaseConfig";
import BookingForm from "./BookingForm";

class Card extends Component {

    state={
        openModal:false
    }

    closeModalEvent(){
        this.setState({
            openModal:false
        })
    }

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
            })

            this.setState({
                openModal:!this.state.openModal
            })
            
        }else{
            alert("Vänligen logga in först för att boka en tid.")
        }
    }

    render() {
        const { name, description, image, price } = this.props
        return (
                <div className={"card"}>
                    <BookingForm openModal={this.state.openModal} closeModal={this.closeModalEvent.bind(this)}/>
                    <img src={image} className={"card-img-top"} alt={name} />
                    <div className={"card-body"}>
                        <h5 className={"card-title"}>{name}</h5>
                        <p className={"card-text"}>{description}</p>
                        <button onClick ={this.SaveToFireStore.bind(this)} className={"btn btn-boka"}>Boka</button>
                        <span>{price} kr</span>
                    </div>
                </div>
        )
    }
}
export default Card;