import React, {Component} from "react";
import Navbar from "../navbar/Navbar";
import { gql } from "apollo-boost";
import {Query} from "react-apollo";
import "../all/all.scss"

const POST_QUERY = gql`
query {
  category{
    products{
      id
      name
      inStock
      gallery
      category
    }
  }
}

   `;


class ALL extends Component {



    render(){

        return( <div>

<Navbar/>
<Query query={POST_QUERY}>
{({loading,data,error}) => {
if (loading){ return 'loading...';}
if (error){
  return <div>Error: {error.toString()}</div>
}

console.log(data);

return(
  <div>
{
  <div className="products">
    {data.category.products.map(product =>(
<ul className="cont">
      <div className="all">

<div className="name">
        {product.name}
</div>
<li>
<div className="items">
  <img className="item"  src={product.gallery} key={product.id}/>
</div>
</li>

   </div>
   </ul>
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