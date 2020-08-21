import React, { Component } from "react"
import { Link } from "react-router-dom";
import firebase from "./FirebaseConfig";
import CancelBooking from "./CancelBooking";

class BokCard extends Component {
    state={
        displayName:"",
        product_id:this.props.id,
        openModal:false
    }

    openModalEvent=()=>{
        this.setState({
            openModal:!this.state.openModal
        })
    }

    cancelCloseModal(){
        this.setState({
            openModal:false
        })
    }
    
    closeModalEvent(){
        this.setState({
            openModal:false
        })
    }
    componentDidMount(){
        var user=firebase.auth().currentUser
        if(user){
            var displayName=user.displayName
            this.setState({
                displayName
            })
            localStorage.setItem("product_id", this.props.id)
        }else{console.log("error")}
    }


render(){
    const {id, name, firstName, familyName, price, datum, tid, phoneNumber} =this.props
    return (
        <React.Fragment>
            <div className={"card"} style={{ width: "18rem" }}>
                <CancelBooking cancelId={id} callbackFromparent={this.cancelCloseModal.bind(this)}
                openModal={this.state.openModal} closeModal={this.closeModalEvent.bind(this)}/>
                <div className={"card-body"}>
                    <h5 className={"card-title"}>{firstName} {familyName}</h5>
                    <h5 className={"card-title"}>{name}</h5>
                    <h5 className={"card-title"}>{price} kr</h5>
                    <p className={"card-text"}>{datum} {tid}</p>
                    <p className={"card-text"}>{phoneNumber}</p>
                    <button className={"btn btn-boka"}><Link to="/rebook">Boka om</Link></button><br />
                    <button onClick ={this.openModalEvent} className={"btn btn-boka"}>Avboka</button>
                </div>
            </div>
            </React.Fragment>
        
    )
}
    
}
export default BokCard;