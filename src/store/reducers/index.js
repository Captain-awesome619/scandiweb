import { combineReducers } from "redux";
import category from "./categories";
import currency from "./Currency";
import cart from "./Cart";

export default combineReducers({
  cart,
  currency,
  category
});
