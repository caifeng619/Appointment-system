import React, { Component } from "react";
import { BrowserRouter, Route, Switch} from "react-router-dom";
import App from "./App";
import KontaktForm from "./KontaktForm";
import Notfoundpage from "./Notfoundpage";
import CancelBooking from "./CancelBooking";
import AdminSida from "./Auth/AdminSida";
import Logout from "./Auth/Logout";
import AdminProfil from "./Auth/AdminProfil";
import AddProduct from "./Dashboard/AddProduct";
import GetProducts from "./Dashboard/GetProducts";
import UpdateProduct from "./Dashboard/UpdateProduct";
import DeleteProduct from  "./Dashboard/DeleteProduct";
import UserPage from "./AuthUser/UserPage";
import UserLogout from "./AuthUser/UserLogout";
import ChangePassword from "./AuthUser/ChangePassword";
import UserProfile from "./AuthUser/UserProfile";
import Contact from "./Contact";
import MinaBokningar from  "./AuthUser/MinaBokningar";
import UserInfo from "./AuthUser/UserInfo";
import DeleteAccount from "./AuthUser/DeleteAccount";
import AddImage from "./AuthUser/AddImage";
import BookSuccess from "./BookSuccess";
import ResetPassword from "./ResetPassword";
import ReBook from "./Rebook";


class Approute extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" component={App} exact></Route>
                    <Route path="/userpage" component={UserPage} exact></Route>
                    <Route path="/form" component={KontaktForm} exact></Route>
                    <Route path="/adminsida" exact component={AdminSida}></Route>
                    <Route path="/add" component={AddProduct} exact></Route>
                    <Route path="/profil" component={AdminProfil} exact></Route>
                    <Route path="/get" component={GetProducts} exact></Route>
                    <Route path="/update" component={UpdateProduct} exact></Route>
                    <Route path="/delete" component={DeleteProduct} exact></Route>
                    <Route path="/logout" component={Logout} exact></Route>
                    <Route path="/logoutuser" component={UserLogout} exact></Route>
                    <Route path="/reset" component={ResetPassword} exact></Route>
                    <Route path="/rebook" component={ReBook} exact></Route>
                    <Route path="/profile" component={UserProfile} exact></Route>
                    <Route path="/contact" component={Contact} exact></Route>
                    <Route path="/success" component={BookSuccess} exact></Route>
                    <Route path="/cancel" component={CancelBooking} exact></Route>
                    <Route path="/profile/changepassword" component={ChangePassword} exact></Route>
                    <Route path="/profile/minabokningar" component={MinaBokningar} exact></Route>
                    <Route path="/profile/userinfo" component={UserInfo} exact></Route>
                    <Route path="/profile/deleteaccount" component={DeleteAccount} exact></Route>
                    <Route path="/profile/addimage" component={AddImage} exact></Route>
                    <Route component={Notfoundpage}></Route>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Approute;