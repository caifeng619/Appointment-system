import React, { Component } from 'react';
import firebase from "../FirebaseConfig";

class UserLogout extends Component {

    componentDidMount(){
        localStorage.clear();
        firebase.auth().signOut();
        
    }
    render() { 
        return ( <div>
        </div> );
    }
}
 
export default UserLogout;