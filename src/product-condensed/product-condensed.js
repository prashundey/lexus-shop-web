import React, {Component} from 'react';
import './product-condensed.css';
import DataService from '../services/data-service';

let ds = new DataService();

class ProductCondensed extends Component {

  constructor(props) {
    super(props);

    // Bind Functions
    this.removeProduct = this.removeProduct.bind(this);
  }

  removeProduct = () => {
    ds.removeWishlistItem(this.props.product)
  }

  render() {
    return(
      <li className="list-group-item d-flex flex-row pc-condensed">
        <button className="btn btn-outline-danger" onClick={() => this.removeProduct()}>X</button>
        <p>{this.props.product.title} | <b>${this.props.product.price}</b></p>
      </li>
    );
  }
}

export default ProductCondensed;
