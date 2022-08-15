import React, { Component } from 'react'
import { CART } from '../../../queries/queries';
import CartItem from '../cartitem/CartItem';
import empty from "../../../assests/empty-cart.svg"
import {graphql} from "react-apollo"
import {connect} from "react-redux"
import "../cartpage/cartpage.scss"
import * as clearcart from "../../../store/actions/Cart"

 class Cartpage extends Component {

  constructor(){
    super();
    this.state = {
      image : 0
    }
  }

  handleCheckOut() {
    return this.props.dispatch(clearcart.CLEAR_CART());
  }

  getfullnumber() {
    let num = 0;
    this.props.cartItems.map((cartItem) =>
     num =  cartItem.quantity + num
    );
    return (num);
  }


  getFullPrice(data) {
    let price = 0;
    this.props.cartItems.map((cartItem) =>
      data.category.products.map((item) => {
        if (cartItem) {
          if (item.id === cartItem.productId) {
            return ( price +=
              item.prices[this.props.activeCurrency].amount *
              cartItem.quantity);
          }
        }
        return null;
      })
    );
    return parseFloat(price).toFixed(2);
  }


  CartItems(){
    return this.props.cartItems.map((cartItem, key) => {
      return this.props.data.category.products.map((item) => {
        if (item.id === cartItem.productId && cartItem.quantity !== 0) {
return(
  <CartItem
key={key}
cartItem={cartItem}
item={item}
activeCurrency={this.props.activeCurrency}
  />
)

        }
return null;
      }
       ) })}



  render() {
    const data = this.props.data
    if(data.loading){
      return <p>Getting Cart items...</p>
    }
    const totalprice = this.getFullPrice(data)
    const tax = totalprice * 0.21
    return ( <div className='cart'>
      <p className=' carttitle'>CART</p>
{this.props.cartItems.length === 0 ? (
  <div className='emptycart'>
<img
src={empty}
alt="empty cart"
/>
<p className='empty-msg'> oops! Looks like your cart is empty</p>
  </div>
) : (
  <>
<div>
  <p className='header'></p>
  <div className='page-items'>{this.CartItems()}</div>
</div>
<div className='cartcheckout'>
  <div className='bordercart'>
  <div className='tax'> <p>Tax:</p> <strong><p>{this.props.data.currencies[this.props.activeCurrency].symbol}
{tax.toFixed(2)}  </p></strong>  </div>

<div className="pagequantity">
  <p>Quantity:</p>
 <strong><p> {this.getfullnumber()}{" "}
  {this.props.cartItems.length === 1 ? "item" : "items"} </p> </strong>
  </div>

    <div className='total2'> <p className='pagetotal'>Total : </p>
<p className='pageprice'>{this.props.data.currencies[this.props.activeCurrency].symbol}
  {totalprice} </p> </div>

</div>
<div>
  <button
          className="checkout3"
          onClick={() => {
            this.handleCheckOut();
          }}
        >
          <p className="order2">ORDER</p>
        </button>
        </div>
</div>
  </>
)}
      </div>
    )
  }
}

export default connect((state) => ({
  cartItems: state.cart.cartItems,
  activeCurrency: state.currency.activeCurrency,
}))(
  graphql(CART, {
    options: () => {
      return {
        fetchPolicy: "no-cache",
      };
    },
  })(Cartpage)
);
