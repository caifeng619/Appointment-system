import React from "react"
import { Link } from "react-router-dom"
import { FaCalendarAlt, FaCalendarPlus, FaUserAlt, FaBars, FaEnvelopeSquare} from "react-icons/fa"
import "../style/_header.scss"

class Header extends React.Component {
    state={
        menu:false
    }
    hamMenu(){
        this.setState(prevState=>({menu:!prevState.menu}))
    }
    minaBokningarDisable(e){
        e.preventDefault();
        alert("Du har inte loggat in!")
    }
    render() {
        const {menu} =this.state
        const loggedIn=null || localStorage.getItem("displayname")
        return (
            <nav className="navbar">
                <Link to="/"><img src={require('../images/logo.png')} alt={"logo"} /></Link>
                <ul className={menu ? "open nav-links" : "nav-links"}>
                    <li><Link to="/"><FaCalendarPlus /> Boka tid</Link></li>
                    
                    {!loggedIn ? 
                    <React.Fragment>
                        <li onClick={this.minaBokningarDisable.bind(this)}><Link to="/"><FaCalendarAlt /> Mina bokningar</Link></li>
                        <li><Link to="/userpage"><FaUserAlt /> Login</Link></li>
                    </React.Fragment>
                    :<React.Fragment>
                        <li><Link to="/profile/minabokningar"><FaCalendarAlt /> Mina bokningar</Link></li>
                        <li><Link to="/profile/userinfo"><FaUserAlt /> Mitt konto</Link></li>
                        <li><Link to="/logoutuser"><FaUserAlt /> Logout</Link></li>
                    </React.Fragment>}
                    <li><Link to="/contact"><FaEnvelopeSquare /> Kontakta Oss</Link></li>
                    <li><Link to="/adminsida"><FaUserAlt /> Admin</Link></li>
                </ul>
                <div id="hamburger"><FaBars onClick={this.hamMenu.bind(this)}/></div>
            </nav>
        )
    }
}
export default Header;