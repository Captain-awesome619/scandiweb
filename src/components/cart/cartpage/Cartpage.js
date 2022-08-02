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
  <p className='tax'>Tax: <strong>{this.props.data.currencies[this.props.activeCurrency].symbol}
{tax.toFixed(2)} </strong>  </p>

<p className="pagequantity">
  Quantity:
  <strong> {this.props.cartItems.length}{" "}
  {this.props.cartItems.length === 1 ? "item" : "items"}
  </strong></p>

    <p className='total2'> Total :
<strong>{this.props.data.currencies[this.props.activeCurrency].symbol}
  {totalprice} </strong> </p>

</div>
<div>
  <button
          className="checkout2"
          onClick={() => {
            this.handleCheckOut();
          }}
        >
          CHECK OUT
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
