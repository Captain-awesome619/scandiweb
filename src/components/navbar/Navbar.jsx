import React, {Component} from "react";
import "./navbar.scss";
import { GiHamburgerMenu } from "react-icons/gi";
import {AiOutlineShoppingCart} from "react-icons/ai"



class Navbar extends Component {

 constructor(props){
  super(props);{
   this.toggleDisplay = this.toggleDisplay.bind(this)
   this.state={
      display: false
    }}}
 toggleDisplay(){
this.setState({display: !this.state.display })
 }
    render(){
        return <div className="container1">
<nav className="nav">
        <div className= 'links'>
          <ul className={`link ${this.state.display=== true ? "active" : ""}`} >
            <li >
              <a className="list" href="/">ALL</a>
            </li>
            <li >
              <a className="list" href="clothes">CLOTHS</a>
            </li>
            <li >
              <a className="list" href="tech">TECH</a>
            </li>
          </ul>

          <div className="toggler">
            <GiHamburgerMenu onClick={this.toggleDisplay} />
          </div>
          < AiOutlineShoppingCart className="icon1"  />
        </div>
      </nav>
      </div>


    }
}
export default Navbar