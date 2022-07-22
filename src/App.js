import React,{ Component } from 'react';
import './App.css';

import Navbar from './components/Navbar/Navbar';
import { Provider } from 'react-redux';
import store from './store/index'

import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Category from '../src/components/category/Category'
import ProductDetails from './components/productdetails/ProductDetails';
import Cartpage from './components/cart/cartpage/Cartpage';
 class App extends Component {

render(){
  return(<div>

    <Provider store={store}>
     <BrowserRouter>
     <Navbar/>
<Routes>
<Route path="/" element={<Category/>}/>
<Route path="/product/:id" element={<ProductDetails/>}/>
<Route path="/cart" element={<Cartpage/>}/>
</Routes>
</BrowserRouter>
</Provider>

  </div>

  )
  }
}
export default App;