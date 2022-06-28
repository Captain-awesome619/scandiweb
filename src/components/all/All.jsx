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



    render(){

        return( <div>
          <div>
<Navbar/>
</div>
<h1 className="header">ALL</h1>

<Query query={POST_QUERY}>
{({loading,data,error}) => {
if (loading){ return 'loading...';}
if (error){
  return <div>Error: {error.toString()}</div>
}
console.log(data);

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
<div className="name">
        {product.name}
</div>
{[product.prices].map(price =>( <div>
  {price[0].amount}
  {price[0].currency.symbol}
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


</div>
)
    }
  }



export default ALL;
