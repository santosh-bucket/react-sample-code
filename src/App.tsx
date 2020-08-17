import React from 'react';
import './App.scss';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Home from './pages/Home';
import EditItem from './pages/EditItem';
function App() {
  return (
    <Router>
        <Route exact path="/" component={Home}/>  
        <Route path="/edit/:id" component={EditItem} />                                      
    </Router>
);
}

export default App;
