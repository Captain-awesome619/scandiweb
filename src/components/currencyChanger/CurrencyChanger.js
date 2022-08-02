import React from 'react'
import "../currencyChanger/currencychanger.scss"
import{graphql} from "react-apollo"
import * as CurrencyActions from "../../store/actions/Currency"
import { connect } from 'react-redux'
import '../currencyChanger/currencychanger.scss'
import { Currencies } from '../../queries/queries'



class CurrencyChanger extends React.Component {
    currencyconvert(key, symbol) {
      this.props.dispatch(CurrencyActions.changeCurrency(key, symbol));
    }

    showcurrency(data) {
      return data.currencies.map((currency, key) => {
        return (
          <button
            key={key}
            className={
              key === this.props.currency.activeCurrency
                ? "currenactive"
                : "curren"
            }
            onClick={() => {
              this.currencyconvert(key, currency.symbol);
              this.props.onOutClick();
            }}
          >
            {currency.symbol} {currency.label}
          </button>
        );
      });
    }

    render() {
      const data = this.props.data;
      if (data.loading) {
        return <p>...</p>;
      }
      return (
        <div className="CurrencySwitcher">
          <div
            className="CurrencySwitcher-Background"
            onClick={this.props.onOutClick}
          >
            <div
              className="overlay"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {this.showcurrency(data)}
            </div>
          </div>
        </div>
      );
    }
  }

  export default connect((state) => ({ currency: state.currency }))(
    graphql(Currencies)(CurrencyChanger)
  );
