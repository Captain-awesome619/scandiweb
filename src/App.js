import React,{ Component } from 'react';
import './App.css';
import {Switch,Route, BrowserRouter, Routes} from 'react-router-dom'
import ALL from './components/all/All';
import Cloths from './components/cloths/Cloths';
import ProductDetails from './components/productdetails/ProductDetails';
import Tech from './components/tech/Tech';


 class App extends Component {
render(){
  return <BrowserRouter>
  <Switch>
    <Route  exact path='/'component={ALL}/>
    <Route  exact path="/clothes" component={Cloths}/>
    <Route  path="/tech" component={Tech}/>
    <Route  path="/:id" component={ProductDetails}/>
    </Switch>
   </BrowserRouter>
  }
}
export default App;