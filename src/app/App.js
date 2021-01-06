import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import HttpService from '../services/http-service';

// Components
import Product from '../product/product';
import Wishlist from '../wishlist/wishlist';

// Services
const http = new HttpService();

class App extends Component {

  constructor(props){
    super(props);
    this.state = {products:[]};


    // Bind Functions
    this.loadData = this.loadData.bind(this);
    this.productList = this.productList.bind(this)
    this.loadData();
  }

  loadData = () => {
    var self = this;
    http.getProducts().then(data => {
        self.setState({products: data})
      }, err => {
      });
  }

  productList = () => {
    const list = this.state.products.map((product) =>
      <div className="col-sm-12 col-md-6 col-lg-4 d-flex " key={product._id}>
        <Product product={product}/>
      </div>
    );

    return (list);
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>2G LEXUS AFTERMARKET</p>
        </header>
        <div className="container-fluid App-main">
          <div className="row">
            <div className="col-lg-8 col-md-6 col-sm-12">
              <div className="row">
                {this.productList()}
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <Wishlist/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
