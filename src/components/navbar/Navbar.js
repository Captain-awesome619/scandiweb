import React, { Component } from 'react'
import { graphql } from "react-apollo";
import { connect } from "react-redux";
import { withRouter } from "../../utils/withRouter";
import * as CategoryActions from "../../store/actions/Categories";
import icon from '../../assests/logo.svg'
import down from '../../assests/arrow-down.svg'
import up from '../../assests/arrow-up.svg'
import Navbuttons from '../navbuttons/Navbuttons';
import { gql } from 'apollo-boost';
import "../Navbar/Navbar.scss"
import CartOverlay from '../cart/cartovelay/CartOverlay';
import CurrencyChanger from '../currencyChanger/CurrencyChanger';
import cart from "../../assests/cart.svg"
import { GiHamburgerMenu } from "react-icons/gi";

const NAVDATA = gql`
  query GetHeaderData {
    categories {
      name
    }
    currencies {
      symbol
      label
    }
  }
`;

class Navbar extends Component {
    constructor(props) {
      super(props);{
        this.toggleDisplay = this.toggleDisplay.bind(this)
      this.state = {
        catselected: this.props.category.activeCategory,
        currencyOption: false,
        cartoverlay: false,
        display : false
      };
    }
    }



    changecat(key, name) {
      if(this.state.currencyChanger) this.setState({currencyChanger: false})

        this.setState({ catselected: key });
        this.props.dispatch(CategoryActions.Switch_Category(key, name));
        if (this.props.location.pathname !== "/") {
          this.props.navigate(`/`);
        }
      }
      currencyChanger() {
        this.setState({
          currencyOption: !this.state.currencyOption,
        });
        if (this.state.cartoverlay)  this.setState({
cartoverlay: false
        })
      }
      showcat() {
        const data = this.props.data;
        if (data.loading) {
          return <div>...</div>;
        }
        return data.categories.map((category, key) => {
          return (
            <Navbuttons
              key={key}
              active={this.state.catselected === key ? true : false}
              name={category.name}
              onClick={() => {
                this.changecat(key, category.name);
              }}
            ></Navbuttons>


          );

        });
      }

ToggleCartOverlay(){
  this.setState({
    cartoverlay: !this.state.cartoverlay
  });
  if (this.state.currencyOption) this.setState({
    currencyOption: false
  })
}

toggleDisplay(){
  this.setState({display: !this.state.display});
    }
      render() {
        const data = this.props.data;
        if (data.loading) {
          return <div>LOADING...</div>;
        }
        localStorage.setItem("INITIAL-CATEGORY", data.categories[0].name);
        localStorage.setItem("INITIAL-CURRENCY", data.currencies[0].symbol);
        return(
            <div className='container'>

<div className="title" >
   <div className={`titles ${this.state.display === true ? "active" : ""}`}>
   {this.showcat()} </div>
    <div className="toggler">
            <GiHamburgerMenu onClick={this.toggleDisplay} />
          </div>
</div>
            <div
              className="changer"
              onClick={() => {
                this.currencyChanger();
              }}
            >
              <div className="symbol">
              {this.props.currency.activeCurrencySymbol}
              </div>
              <div className="pointer">
                {this.state.currencyOption === true ? (
                  <img
                    className="up"
                    alt="up"
                    src={up}
                  />
                ) : (
                  <img
                    className="down"
                    alt="arrow "
                    src={down}
                  />
                )}
              </div>
            {this.state.currencyOption === true ? (
              <CurrencyChanger
                onOutClick={() => {
                  this.setState({ currencyOption: false });
                }}
              />
            ) : null}
            </div>
            <div>
<div className='overlay'>
          { [this.props.cartItems].length > 0 ? (
    <p className='figure'>{[this.props.cartItems].length}</p>
        ) : null }

<img
src={cart}
alt="cart"
className='cart1'
onClick={() =>{this.ToggleCartOverlay()}}

/>
</div>
{this.state.cartoverlay === true ? (
  <CartOverlay
onOutClick = {() => {
  this.setState({
cartoverlay : false
  })
}}


  />
) : null }

            </div>
</div>
        )}}
export default connect((state) => ({
    category:state.category,
    currency: state.currency,
    cartItems: state.cartItems,
}))(graphql(NAVDATA)(withRouter(Navbar)));