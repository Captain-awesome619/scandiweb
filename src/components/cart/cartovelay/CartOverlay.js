import React, { Component } from 'react'
import {graphql} from 'react-apollo'
import * as CartActions from '../../../store/actions/Cart'
import emptyicon from '../../../assests/empty-cart.svg'
import minus from '../../../assests/minus.svg'
import plus from "../../../assests/plus.svg"
import { withRouter } from '../../../utils/withRouter'
import {connect} from "react-redux"
import { gql } from 'apollo-boost'
import "../cartovelay/cartoverlay.scss"
import cancel from "../../../assests/x.png"


export const CART = gql`
  query GetCartData {
    category {
      products {
        id
        name
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        attributes {
          id
          name
          type
          items {
            id
            displayValue
            value
          }
        }
        gallery
        brand
      }
    }
    currencies {
      symbol
      label
    }
  }
`;


class CartOverlay extends Component {

  showAttributes(cartItem, item) {
    return cartItem.attributes.map((cartItemAttribute, index) => (
    <div
    className="features1"
    key={index}
    >

    <p className="features1-name">
    {cartItemAttribute.id}:
    </p>
    {item.attributes.map((itemAttribute) =>
    cartItemAttribute.id === itemAttribute.id
    ? itemAttribute.items.map((itemAttributeSelection, key) => {
    if (cartItemAttribute.type === "text") {
    return (
<div
    className="features1-Attribute"
    key={itemAttributeSelection.id}>
    <div className='text-options' >
    <button

        className={
        cartItemAttribute.selected === key
            ? "selected-option"
            : "unselected-option"
        }
    >
        <p className="option-tex">
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
    className="features1-swatch"
    key={key}
>

<div>
    <button
    className={
        cartItemAttribute.selected === key
        ? "color-selected"
        : "color-notselected"
    }
    style={{
        backgroundColor: `${itemAttributeSelection.value}`,
    }}
    />
    <p className="swatch-text">
    {itemAttributeSelection.displayValue}
    </p>
</div>

</div>
);
}
return null;
            })
        : null
    )}

    </div>
));
}




 showProducts(data) {
 return this.props.cartItems.map((cartItem, key) => {
 return data.category.products.map((item) => {
 if (cartItem) {
 if (item.id === cartItem.productId && cartItem.quantity !== 0) {
 return (
 <div key={key} className="top">
 <div className='border-top'>
     <div className="title-details">
     <p className="features1-brand">
         {item.brand}
     </p>
     <p className="features1-name">
         {item.name}
     </p>
     </div>
     <div className='currency-border'>
     <p>
         {item.prices[this.props.activeCurrency].currency.symbol}
         {item.prices[this.props.activeCurrency].amount}
     </p>
     </div>
     {this.showAttributes(cartItem, item)}
 </div>
 <div className='quantity'>
 <div className="amount">
     <button
     className="plus"
     onClick={() => {
         this.props.dispatch(
         CartActions.UPDATE_AMOUNT(
             key,
             cartItem.quantity + 1
         )
         );
     }}
     >
     <img
         src={plus}
         className="plus-icon"
         alt="plus"
     />
     </button>
     <p>
     {cartItem.quantity}
     </p>
     <button
     className="minus"
     onClick={() => {
         if (cartItem.quantity === 1) {
         this.props.dispatch(CartActions.DELETE_IN_CART(cartItem));
         } else {
         this.props.dispatch(
             CartActions.UPDATE_AMOUNT(
             key,
             cartItem.quantity - 1
             )
         );
         }
     }}
     >
     <img
         src={minus}
         className="minus-icon"
         alt="minus"
     />
     </button>
 </div>
 <div>
     <img
     src={item.gallery[0]}
     className="overlay-image"
                 alt="Product"
                       />
                     </div>
                     </div>
                   </div>
                 );
               }
             }
             return null;
           });
         });
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

       handleCheckOut() {
         return this.props.dispatch(CartActions.CLEAR_CART());
       }
       render() {
         const data = this.props.data;
         if (data.loading) {
           return <p>LOADING...</p>;
         }
         const fullPrice = this.getFullPrice(data);
         return (
           <div className="Minicart">
             <div
               className="background"
               onClick={this.props.onOutClick}
             >
               <div
                 className="overlay-background"
                 onClick={(e) => {
                   e.stopPropagation();
                 }}
               >
                 <div className="Minicart-Header">
                  <img
src={cancel}
alt="clear"
className='cancel'
onClick={this.props.onOutClick}
                  />
                   <p className="overlay-title">My Bag</p>
                   <p className="count">
                      {this.props.cartItems.length}{" "}
                     {this.props.cartItems.length === 1 ? "item" : "items"}
                   </p>
                 </div>

                 {this.props.cartItems.length === 0 ? (
                   <div className="empty-cart">
                     <img
                       className="emptyCart-Icon"
                       src={emptyicon}
                       alt="empty"
                     />
                     <p className="emptyCart-Title">
                       YOUR CART IS EMPTY :(
                     </p>
                     <p className="Minicart-EmptyCart-Tip">
                       products added can be seen here!
                     </p>
                   </div>
                 ) : (
                   <>
                     <div className="cart-products">
                       {this.showProducts(data)}
                     </div>
                     <div className="total">
                       <p>Total</p>
                       <p>
                         {
                           this.props.data.currencies[this.props.activeCurrency]
                             .symbol
                         }{fullPrice}

                       </p>
                     </div>
                     <div className="functions">
                       <button
                         className="viewbag"
                         onClick={() => {
                           this.props.navigate(`/cart`);
                           this.props.onOutClick();
                         }}
                       >
                         VIEW BAG
                       </button>
                       <button
                         className="checkout"
                         onClick={() => {
                           this.handleCheckOut();
                         }}
                       >
                         CHECK OUT
                       </button>
                     </div>
                   </>
                 )}
               </div>
             </div>
           </div>

         );

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
       })(withRouter(CartOverlay))
     );









