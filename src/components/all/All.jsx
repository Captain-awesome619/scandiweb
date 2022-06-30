import React, {Component} from "react";
import Navbar from "../navbar/Navbar";
import { gql } from "apollo-boost";
import {Query} from "react-apollo";
import "../all/all.scss"
import {ImCart} from "react-icons/im"
import Search from "../Search";


const POST_QUERY = gql`
query {
  category{
    products{
      id
      name
      inStock
      gallery
      prices{
        amount
        currency{
          symbol
          label
        }
    }
      brand
  }
}
}
   `;


class ALL extends Component {

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
        return( <div>
          <div>
<Navbar/>
</div>
<h1 className="header">ALL</h1>
<select className='btns1'  onChange={this.handleFilter}>
    <option value='USD' >USD</option>
    <option value='GBP'>GBP</option>
    <option value='RUB'>RUB</option>
    <option value='JPY'>JPY</option>
</select>
<Query query={POST_QUERY}>
{({loading,data,error}) => {
if (loading){ return 'loading...';}
if (error){
  return <div>Error: {error.toString()}</div>
}
return(
  <div className="cont">
{
  <div className="products">
    {data.category.products.map(product =>(
<div className="all">
  <div className="items">
  <img className="item"  src={product.gallery} key={product.id}/>
</div>
<ImCart className="icon"/>
<div>
<div className="name"> {product.name}
</div>
{
[product.prices].map(price =>( <div>
  <div>
  {( this.state.filter == '') ?[ price[0].amount, price[0].currency.symbol ]: ''}
{( this.state.filter == 'USD') ? [price[0].amount, price[0].currency.symbol ] : ''}
{( this.state.filter == 'GBP') ? [price[1].amount, price[1].currency.symbol] : ''}
{( this.state.filter == 'RUB') ? [price[2].amount,price[2].currency.symbol ] : ''}
{( this.state.filter == 'JPY') ? [price[3].amount, price[3].currency.symbol ] : ''}
</div>
  <div>


  </div>
  </div>
))}
</div>
   </div>
   ))}
</div>
}
  </div>
)
}}</Query>
c
</div>
)
    }
  }



export default ALL;
