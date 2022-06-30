import React, {Component} from "react";
import { gql } from "apollo-boost";
import {Query} from "react-apollo";


const CURREN_QUERY = gql`
{
    category{
      products{
        prices{
          amount
  currency{
    label
    symbol
  }
  }
  }
    }
  }
`

class Search extends Component {

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

<Query query={CURREN_QUERY}>
{({loading,data,error}) => {
if (loading){ return 'loading...';}
if (error){
  return <div>Error: {error.toString()}</div>}

  {data.category.products.map(product => ( <div>
{
[product.prices].map(price =>( <div>

{({filter :'JPY'}) ? price[3].amount : price[0].amount}
{console.log(price[3].amount)}
  </div>)
)}


  </div>
  ))
  }}
}
</Query>
  return <div>
<select className='btns1'  onChange={this.handleFilter}>
    <option value='USD' >USD</option>
    <option value='GBP'>GBP</option>
    <option value='RUB'>RUB</option>
    <option value='JPY'>JPY</option>
</select>

  </div>
}
}
 export default Search;