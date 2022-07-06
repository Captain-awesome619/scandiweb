import React, {Component} from "react";
import { gql } from "apollo-boost";
import {Query} from "react-apollo";
import Navbar from "../navbar/Navbar";
import "../productdetails/productdetails.scss"

const PROD_QUERY = gql`
    query($id : String!) {
      product(id: $id){
        id
        name
        gallery
        brand
        description
        attributes{
          id
          name
          type
          items{
            id
            displayValue
            value
          }
        }
        prices{
          amount
          currency{
            symbol
          }
        }
      }
    }
    `;






class ProductDetails extends Component{
state = {
  id: null
}
  componentDidMount(){
    console.log(this.props)
    let id = this.props.match.params.id;
    this.setState({
      id: id
    })
  }
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
    console.log(this.state)
   }
  render(){
    console.log(this.props)
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
<Query query={PROD_QUERY} variables={{id:this.state.id}}>
{({loading,data,error}) => {
if (loading){ return 'loading...';}
if (error){
  return <div>Error: {error.toString()}</div>
}
return(
  <div className="wrapper">
    {
      Object.values(data).map((product,gallery)=>(
        <div className="section">
          <div>
          <img key={gallery} src={product.gallery} className='prod'/>
          </div>
          <div className="description">
            <div className="model">
<div className="make">{product.brand}</div>
<div>{product.name}</div>
               </div>
               <div className="size">
                {Object.values(product.attributes).map((attribute,id)=>(
                  <div key={id}>
<h4 className="feature">
  {attribute.name}
</h4>
<div className={`${attribute.type==="text" ? "values" : "color"}`}>
  {Object.values(attribute.items).map((item)=>(
    <div className="value">{item.displayValue}</div>
  ))}
</div>
                     </div>
                ))}
                <div>
                  {Object.values([product.prices]).map((price)=>(
                    <div className="prices">
                      <div className="tg">PRICE:</div>

                      <div key={product.index}>
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
                  <button className="btn">ADD TO CART</button>
               </div>
               <div>
                <p>{product.description}</p>
               </div>
          </div>
        </div>
      ))
    }
  </div>
)
}}
</Query>

    </div>
  }
}
export default ProductDetails;