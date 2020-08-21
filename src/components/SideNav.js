import React, { Component } from 'react';
import {Link} from "react-router-dom";
import {FaBars, FaTimes} from "react-icons/fa";
import "../style/_sidenav.scss";

class SideNav extends Component {
    state={
        isChecked:true,
    }
    toggleChange=()=>{
        this.setState({
            isChecked: !this.state.isChecked
        })
    }
    render() { 
        return ( 
            <React.Fragment>
                <input type="checkbox" id="check" checked={this.state.isChecked} onChange={this.toggleChange}></input>
                <label htmlFor="check">
                    <FaBars className={this.state.isChecked ? "btn" :"btn hidebtn"}/>
                    <FaTimes className={this.state.isChecked ? "cancel" :"cancel hidecancel"}/>
                </label>
                <div className={this.state.isChecked ? "sidebar" :"sidebar showsidebar"}>
                    <header>Min profil</header>
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <Link className="nav-link" to="/profile/userinfo">Mina uppgifter</Link>
                            <Link className="nav-link" to="/profile/changepassword">Ändra lösenord</Link>
                            <Link className="nav-link" to="/profile/minabokningar">Mina bokningar</Link>
                            <Link className="nav-link" to="/profile/addimage">Lägg profil bild</Link>
                            <Link className="nav-link" to="/profile/deleteaccount">Radera kontot</Link>
                        </li>
                    </ul>
                </div>
            </React.Fragment>
         );
    }
}
 
export default SideNav;