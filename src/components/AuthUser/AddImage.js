import React, { Component } from "react";
import SideNav from "../SideNav";
import Header from "../Header";
import Footer from "../Footer";

class AddImage extends Component {
  state = {};
  onSubmitUpload=()=>{

  }
  render() {
    return (
      <React.Fragment>
        <Header />
        <SideNav />
        <section>
          <form onSubmit={this.onSubmitUpload}>
            <p>Ladda upp en bild för din profil</p>
            <div className="custom-file">
              <input type="file" className="custom-file-input" id="customFile" name="filetoupdload"/>
              <label className="custom-file-label" htmlFor="customFile">Välja bild</label>
            </div>
          </form>
        </section>
        <Footer />
      </React.Fragment>
    );
  }
}

export default AddImage;
