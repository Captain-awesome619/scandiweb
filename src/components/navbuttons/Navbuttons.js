import React, { Component } from 'react';
import "../navbuttons/navbuttons.scss"


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
         <p className='nav'> {this.props.name} </p>

         {this.props.active === true ? (
          <div className="border" />
        ) : null}

        </div>


      </div>
    );
  }
}

export default Navbuttons;

