import React, { Component } from 'react'
import Features from './features/Features'
import {gql} from "apollo-boost"
import {graphql} from "react-apollo"
import {withRouter} from "../../utils/withRouter"
import {connect} from "react-redux"
import parse from "html-react-parser"
import "../productdetails/productdetails.scss"
import * as AddToCart from '../../store/actions/Cart'

const Product = gql`
  query GetProduct($id: String!) {
    product(id: $id) {
      id
      name
      inStock
      gallery
      description
      category
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      prices {
        currency {
          label
          symbol
        }
        amount
      }
      brand
    }
  }
`;



 class ProductDetails extends Component {
constructor(){
super();
this.state ={
  viewimage : 0
}
  this.attributes =[]

}


AddToCart(data){
  const content = 1;
  if (data.product.attributes.length === 0) {
    this.props.dispatch(
      AddToCart.ADD_TO_CART({
        productId: data.product.id,
        attributes: [],
        quantity: content,
      })
    );
  }
  else {
    if (data.product.attributes.length !== this.attributes.length){
return( alert("PLEASE PICK AN OPTION IN ALL FIELDS!"))
    }
else{
  let error = false;

  this.attributes.map((attribute) => {
    if (attribute.selected === null) {
      error = true;
      return(alert("PLEASE PICK AN OPTION IN ALL FIELDS!"))
    }
return null;
  });
  if (error === false) {
    this.props.dispatch(
      AddToCart.ADD_TO_CART({
        productId: data.product.id,
        attributes: this.attributes,
        quantity: content,
      })
    );
    alert( `${data.product.name} added to the cart` )
  }

}

  }


}


Attributes(data) {
  const dataAttributes = data.product.attributes;
  if (dataAttributes.length !== 0) {return dataAttributes.map((attribute , key) => {
    return(
      <Features
attribute={attribute}
key={key}
Selections={(selection)=> {
  this.Selections(selection);
}}
      />
    )
  })

  }
}

productImage(data){
  return data.product.gallery.map((imageURL,key)=>(
    <img
    src={imageURL}
    key={key}
className="imagess"
alt='options'
onClick={() => (
  this.setState({ viewimage : key})
  )}
    />
  ));
}

Selections(selection){
  let sameId = false;
  let itemKey = null;

  if (this.attributes.length !== 0) {
    this.attributes.forEach((item, key) => {
      if (item.id === selection.id) {
        sameId = true;
        itemKey = key;
      }
    });
    if (sameId) {
      const tempAttributes = [...this.attributes];
      tempAttributes.splice(itemKey, 1, selection);
      this.attributes = tempAttributes;
    } else {
      this.attributes = [...this.attributes, selection];
    }
  } else {
    this.attributes = [selection];
  }

}

  render() {
    const data = this.props.data
    if (data.loading){
      return <h2>getting images...</h2>
    }
    return (
      <div className='product'>
        <div className='show'>

          <div className='images'>
            {this.productImage(data)}
          </div>
          <div>
  {data.product.inStock === false ? <p className='detailstock'>OUT OF STOCK</p> : "" }
</div>
          <img
src= {data.product.gallery[this.state.viewimage]}
className="main-img"
alt='main'
            />

          </div>
<div className='prodetails'>
<div className='prodheader'>
<p className='brand'>{data.product.brand}</p>
<p className='prodname'>{data.product.name}</p>
</div>
<div>
  {this.Attributes(data)}
</div>
<div className='pricing'>
  PRICE:
<div className='amountprice'>
   {data.product.prices[this.props.activeCurrency].currency.symbol}
              {data.product.prices[this.props.activeCurrency].amount}
              </div>
</div>

<div>
{data.product.inStock ? (
  <button
   className='addtocart' onClick={() =>{
    this.AddToCart(data)
   }}>ADD TO CART</button>
): <button className='outofstock-button'>
OUT OF STOCK
  </button>

  }
</div>




<div className="descript">
            {parse(data.product.description)}
          </div>
</div>
      </div>
    )
  }
}

export default connect((state) => ({
  activeCurrency: state.currency.activeCurrency,
})) (
  withRouter(
    graphql(Product, {
      options: (props) => {
        return {
          variables: {
            id: props.match.params.id,
          },
          fetchPolicy: "no-cache",
        };
      },
    })(ProductDetails)
  )
);

