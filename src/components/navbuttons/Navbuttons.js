import React, { Component } from 'react';
import "../navbuttons/navbuttons.scss"
import { GiHamburgerMenu } from "react-icons/gi";

class Navbuttons extends Component {

  constructor(props){
    super(props)
    this.state = {
display : false
    }
  }
  render() {
    return (



      <div className= "navbuttons" >
        <div
          className={
            this.props.active === true
              ? "active-button"
              : "unactive-button"
          }
          onClick={() => {
            this.props.onClick();
          }}
        >
         <a className='nav'> {this.props.name} </a>
        </div>

        {this.props.active === true ? (
          <div className="border" />
        ) : null}



      </div>
    );
  }
}

export default Navbuttons;

