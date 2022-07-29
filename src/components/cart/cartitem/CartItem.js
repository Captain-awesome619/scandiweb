import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as CartActions from "../../../store/actions/Cart"
import left from "../../../assests/arrow-left.svg"
import right from "../../../assests/arrow-right.svg"
import minus from "../../../assests/minus.svg"
import plus from "../../../assests/plus.svg"
import "../cartitem/cartitem.scss"
import {BsFillArrowLeftSquareFill} from "react-icons/bs"
import {BsFillArrowRightSquareFill} from "react-icons/bs"

class CartItem extends Component {

constructor(){
    super();
    this.state ={
        image: 0
    }
}

Attributes() {
    return this.props.cartItem.attributes.map((cartItemAttribute, index) => (
      <div className="item-attributes" key={index}>

        <p className='cartfeatname'>
          {cartItemAttribute.id}:
        </p>
        {this.props.item.attributes.map((itemAttribute) => {
          if (cartItemAttribute.id === itemAttribute.id) {
            return itemAttribute.items.map((itemAttributeSelection, key) => {
              if (cartItemAttribute.type === "text") {
                return (
                  <div
                    className="cartattritext"
                    key={itemAttributeSelection.id}
                  >
                    <div className="carttext">
                      <button
                        className={
                          cartItemAttribute.selected === key
                            ? "carttextselected"
                            : "carttextoption"
                        }
                        key={key}
                      >
                        <p >
                          {itemAttributeSelection.value}
                        </p>
                      </button>
                    </div>
                  </div>
                );
              }
              if (cartItemAttribute.type === "swatch") {
                return (
                  <div
                    className="cartattriswatch"
                    key={itemAttributeSelection.id}
                  >
                    <div>
                      <div

                        key={key}
                      >
                        <button
                          className={
                            cartItemAttribute.selected === key
                              ? "cartswatchselected"
                              : "cartswatchoption"
                          }
                          style={{
                            backgroundColor: `${itemAttributeSelection.value}`,
                          }}
                          key={key}
                        />
                        <p>
                          {itemAttributeSelection.displayValue}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            });
          }
          return null;
        })}
      </div>
    ));
  }


  slider(action) {
    if (action === "+") {
      if (this.props.item.gallery[this.state.image + 1] !== undefined) {
        this.setState({ image: this.state.image + 1 });
      } else {
        this.setState({ imageIndex: 0 });
      }
    } else {
      if (this.props.item.gallery[this.state.image - 1] !== undefined) {
        this.setState({ image: this.state.image - 1 });
      } else {
        this.setState({ image: this.props.item.gallery.length - 1 });
      }
    }
  }


  render() {

    return (
      <div className="Product">
        <div className="Info">
          <div className="cartdetails">
            <p className="cartbrand">
              {this.props.item.brand}
            </p>
            <p className="cartname">
              {this.props.item.name}

            </p>
          </div>
          <div>
            <p className="cartprice">
              {
                this.props.item.prices[this.props.activeCurrency].currency
                  .symbol
              }
              {this.props.item.prices[this.props.activeCurrency].amount}
            </p>
          </div>
          {this.Attributes()}
        </div>

<div className='sideshow'>
        <div className="cartquantity">
          <button
            className="cartadd"
            onClick={() => {
              this.props.dispatch(
                CartActions.UPDATE_AMOUNT(
                  this.props.index,
                  this.props.cartItem.quantity++
                )
              );
            }}
          >
            <img src={plus} alt="plus" />
          </button>
          <p className="cartamount">
            {this.props.cartItem.quantity}
          </p>
          <button
            className="cartminus"
            onClick={() => {
              if (this.props.cartItem.quantity === 1) {
                this.props.dispatch(
                  CartActions.DELETE_IN_CART(this.props.cartItem)
                );
              } else {
                this.props.dispatch(
                  CartActions.UPDATE_AMOUNT(
                    this.props.index,
                    this.props.cartItem.quantity --
                  )
                );
              }
            }}
          >
            <img src={minus} alt="minus icon"

            />
          </button>
        </div>

        <div className="cartimage-area">
          <img
            src={this.props.item.gallery[this.state.image]}
            className="cartimage"
            alt="Product"
          ></img>
<div className='arrowicons'>
< BsFillArrowLeftSquareFill
            className="arrowleft"
            onClick={() => {
              this.slider("-");
            }}
          />
          < BsFillArrowRightSquareFill
            className="arrowright"
            onClick={() => {
              this.slider("+");
            }}
          />
</div>


        </div>
        </div>

        </div>
    )}};

    export default connect((state) => ({
        cartItems: state.cart.cartItems,
      }))(CartItem);


