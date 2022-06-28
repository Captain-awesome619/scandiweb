import React,{ Component } from 'react';
import './App.css';
import { ReactDOM } from 'react';
import Navbar from '../src/components/navbar/Navbar'
import {Switch,Route, BrowserRouter} from 'react-router-dom'
import Search from '../src/components/Search'
import ALL from './components/all/All';




 class App extends Component {



render(){
  return <BrowserRouter>
   <Switch>
    <Route exact path='/'>
<ALL/>
    </Route>
    

   </Switch>
</BrowserRouter>
  }
}
export default App;