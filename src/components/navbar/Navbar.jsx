import React, {Component} from "react";
import "./navbar.scss";
import { ReactDOM } from "react-dom";
import {ImCart} from "react-icons/im"
import {BsCurrencyDollar } from "react-icons/bs"
import {IoIosArrowDown} from "react-icons/io"
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";



class Navbar extends Component {

constructor(props){
  super(props);{
   this.toggleDisplay = this.toggleDisplay.bind(this)
    this.state={
      display: false
    }
  }
  
}



 toggleDisplay(){
this.setState({display: !this.state.display })
 }




    render(){

        return <div className="container1">
<nav className="nav">
        <div className= 'links'>
          <ul className={`link ${this.state.display=== true ? "active" : ""}`} >
            <li >
              <a className="list" href="">ALL</a>

            </li>
            <li >
              <a className="list" href="">CLOTHS</a>

            </li>

            <li >
              <a className="list" href="">TECH</a>

            </li>


          </ul>
          <div className="toggler">


            <GiHamburgerMenu onClick={this.toggleDisplay} />



          </div>


        </div>

      </nav>
      <div className="lnav" >


</div>
      <ImCart className="icon1" />
      </div>


    }
}
export default Navbar