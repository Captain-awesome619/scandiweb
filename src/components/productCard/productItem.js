import React, { Component } from 'react'
import { withRouter } from '../../utils/withRouter';
import '../productCard/productitem.scss'
import Carticon from '../../assests/white-cart.svg'
import { connect } from 'react-redux';
import * as CartActions from "../../store/actions/Cart"

 class ProductItem extends Component {

  constructor() {
    super();
    this.state ={
addToCart: false
    }
  }

  ProductDetails(){
    this.props.navigate(`/product/${this.props.data.id}`);
  }

Addtocart(e){
if (this.props.data.attributes.length === 0 ) {
  this.props.dispatch(
    CartActions.ADD_TO_CART({
      productId: this.props.data.id,
      attributes: [],
      quantity:1
    })
  )
}
else{
  let attributesSelection = [];
  this.props.data.attributes.map((attribute, key) => {
    const initialOption = 0;
    const recentattribute = {
      id: attribute.id,
      type: attribute.type,
      selected: initialOption,
    };
    return(attributesSelection = [...attributesSelection,recentattribute])
  });


  this.props.dispatch(
    CartActions.ADD_TO_CART({
      productId: this.props.data.id,
      attributes: attributesSelection,
      quantity: 1
    })
  )
}
alert( `${this.props.data.name} added to the cart` )
e.stopPropagation();
}


  render() {
    return (
<div className='cardwrapper'>
      <div className="Productcard"
      onClick={(e) =>{
e.stopPropagation();
        this.ProductDetails();}}
onMouseEnter={()=>{
  this.setState({addToCart:true})
}}
onMouseLeave={()=>{this.setState({addToCart: false})}}>
<div className={`${this.props.data.inStock === false ? "outstock2" : "instock2"}`} >
<div>
<div className='msg1'>{this.props.data.inStock === false ?
    <p className='msg'>OUT OF STOCK  </p>  : null }</div>
  <img
className='image'
src={this.props.data.gallery[0]}
alt="img"
  />

{this.state.addToCart ? (
            this.props.data.inStock === true ? (
              <button
                className="cart-icon"
                onClick={(e) => {
                  this.Addtocart(e)
                }}
              >
                <img
                  src={Carticon}
                  className="instock-icon"
                  alt="add to cart"
                />
              </button>
            ) : (
              <button
              disabled = {true}
                className="cart-icon"
                onClick={(e) => {
                  e.stopPropagation(e);
                }}
              >
                <img
                  src={Carticon}
                  className="outstock-icon"
                  alt="add to cart"
                />
              </button>
            )
          ) : null}



  <div className='itemdetails'>
   <p> {this.props.data.name}</p>
   <p> {this.props.data.brand}</p>
  </div>

    <div className='itemprice'>

    {this.props.data.prices[this.props.currency].currency.symbol}{" "}
            {this.props.data.prices[this.props.currency].amount}

    </div>
    </div>
    </div>
</div>
</div>
    )
  }
}
export default connect()(withRouter(ProductItem))




