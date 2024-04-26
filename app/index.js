import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';

const App = () => (
  <Router>
    <div>
      <Switch>
        <Route path="/add" component={ProductForm} />
        <Route path="/edit/:id" component={ProductForm} />
        <Route path="/" component={ProductList} />
      </Switch>
    </div>
  </Router>
);

ReactDOM.render(<App />, document.getElementById('root'));
