import React, { Component } from 'react';
import Modal from 'react-modal';
import "../style/_choosetime.scss";
import firebase from "./FirebaseConfig";

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

class BookingForm extends Component {
    state={
        date:"2020-08-30",
        time:"10:00"
    }

    handleOnChange=(e)=>{
        this.setState(
            {
                [e.target.name]:e.target.value
            }
        )
    }

    saveBookingTofirestore=(e)=>{
        e.preventDefault();
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
                date:this.state.date,
                time:this.state.time,
                status:"isbooking"
            }).then(res=>{
                console.log(res.id)
                localStorage.setItem("booking_id", res.id)
                window.location.replace("/form") 
            })
        }else{
            console.log("error")
        }
    }
    render() { 
        return ( 
                <Modal
                isOpen={this.props.openModal}
                onRequestClose={this.props.closeModal}
                style={customStyles}
                contentLabel="Boking form">
                <div className="choosetime-container">
                    <form onSubmit={this.saveBookingTofirestore}>
                        <h3>Välj datum och en tid!</h3>  
                        <p>Du kan ändra eller avboka din tid utan kostnad online.</p>
                        <label>Datum</label>
                        <input value={this.state.date} onChange={this.handleOnChange} type="date" id="date" name="date" /><br/>
                        <label>Tid</label>
                        <input value={this.state.time} onChange={this.handleOnChange} type="time" id="time" name="time"></input>
                        <button className="btn btn-boka">Gå vidare</button>
                        <button className="btn btn-boka" onClick={this.props.closeModal}>close</button>
                    </form>
                </div>
                </Modal>
        );
    }
}
 
export default BookingForm;