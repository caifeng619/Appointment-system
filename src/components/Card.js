import React, { Component } from "react";
import BookingForm from "./BookingForm";
import firebase from "./FirebaseConfig";

class Card extends Component {

    state={
        openModal:false
    }

    openModalEvent(){
        this.setState({
            openModal:!this.state.openModal
        })  
    }

    closeModalEvent(){
        this.setState({
            openModal:false
        })
    }

    checkIflogin(){
        var user=firebase.auth().currentUser
        if(user){
            var userid=user.uid
            console.log(userid)
            this.openModalEvent()
        }else{
            alert("Vänligen logga in först för att boka en tid.")
        }
    }
    render() {
        const { name, description, image, price } = this.props
        return (
                <div className={"card"}>
                    <BookingForm name={name} description={description} price={price} openModal={this.state.openModal} closeModal={this.closeModalEvent.bind(this)}/>
                    <img src={image} className={"card-img-top"} alt={name} />
                    <div className={"card-body"}>
                        <h5 className={"card-title"}>{name}</h5>
                        <p className={"card-text"}>{description}</p>
                        <button onClick ={this.checkIflogin.bind(this)} className={"btn btn-boka"}>Boka</button>
                        <span>{price} kr</span>
                    </div>
                </div>
        )
    }
}
export default Card;