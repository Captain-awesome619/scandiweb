import React, {Component} from "react";
import Navbar from "../navbar/Navbar";
import { gql } from "apollo-boost";
import {Query} from "react-apollo";
import '../cloths/cloths.scss'
import {AiOutlineShoppingCart} from "react-icons/ai"
import { Link } from "react-router-dom";
import ProductDetails from "../productdetails/ProductDetails";

const POSTS_QUERIES = gql`
query{
    category(input: {title:"clothes"} ){
     products{
      id
       name
       inStock
       gallery
       prices{
         amount
         currency{
           symbol
         }
       }
       brand
     }
   }
   }
   `;

   class Cloths extends Component{

    constructor(props){
      super(props);
      this.state = {
        filter : ''}
        this.handleFilter = this.handleFilter.bind(this)
      }
    handleFilter = (e) =>{
      const  value   = e.target.value;
       this.state.filter = value
      this.setState({ filter : value});
      console.log(this.state);
     }

    render(){

        return <div>
          <div className="head">
<Navbar/>
<div>
<select className='converter'  onChange={this.handleFilter}>
    <option value='USD'>$-USD</option>
    <option value='GBP'>£-GBP</option>
    <option value='AUD'>A$-AUD</option>
    <option value='RUB'>₽-RUB</option>
    <option value='JPY'>¥-JPY</option>
</select>
</div>
</div>
<h1 className="clothes">CLOTHES</h1>
<Query query={POSTS_QUERIES}>
{({loading,data,error}) => {
if (loading){ return 'loading...';}
if (error){
  return <div>Error: {error.toString()}</div>
}
return(
  <div>
    {
      <div className="products2">
        {data.category.products.map(product =>(
          <div className="all">
<div className="items">
  <img className="item2" src={product.gallery} alt='product'/>
  <div className="stock">
 {(product.inStock === false ) ?  'out of stock!' : '' }
</div>

<Link key={product.id} to={`${product.id}`}>
<div className="border">
<AiOutlineShoppingCart key={product.id} className="icon" />
</div>
</Link>
<div className="tag">
<div className="name"> {product.name}
</div>
<div className="brand">Producer-{product.brand}</div>
{
[product.prices].map(price =>( <div className="price">
  <div>
{( this.state.filter ===    '') ? [price[0].currency.symbol, price[0].amount] : ''}
{( this.state.filter === 'USD') ? [price[0].currency.symbol, price[0].amount] : ''}
{( this.state.filter === 'GBP') ? [price[1].currency.symbol, price[1].amount] : ''}
{( this.state.filter === 'AUD') ? [price[2].currency.symbol, price[2].amount] : ''}
{( this.state.filter === 'JPY') ? [price[3].currency.symbol, price[3].amount] : ''}
{( this.state.filter === 'RUB') ? [price[4].currency.symbol, price[4].amount] : ''}
</div>
  </div>
))}

</div>
</div>

          </div>
        ))}
      </div>
    }
  </div>
)
}}
</Query>


        </div>
    }
   }
   export default Cloths;