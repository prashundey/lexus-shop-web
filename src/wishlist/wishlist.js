import React, {Component} from 'react';
import './wishlist.css';
import ProductCondensed from '../product-condensed/product-condensed';

// Services
import DataService from '../services/data-service';
import NotificationService, {NOTIF_WISHLIST_CHANGED} from '../services/notification-service';

let ns = new NotificationService();

class Wishlist extends Component {
  constructor(props) {
    super(props);

    this.state = {wishlist: [],
                  totalPrice: 0};
    //this.state = {totalPrice: 0.00};

    // Bind Functions
    this.createWishlist = this.createWishlist.bind(this);
    this.onWishlistChanged = this.onWishlistChanged.bind(this);
  }

  // React Function
  componentDidMount() {
    ns.addObserver(NOTIF_WISHLIST_CHANGED, this, this.onWishlistChanged);
  }

  // React Function
  componentWillUnmount() {
    ns.removeObserver(NOTIF_WISHLIST_CHANGED, this);
  }

  onWishlistChanged = (newWishlist) => {
    var newTotal = 0;
    newWishlist.forEach((product, i) => {
      newTotal += product.price;
    });

    this.setState({wishlist: newWishlist,
                   totalPrice: newTotal});
  }

  createWishlist = () => {
    const list = this.state.wishlist.map((product) =>
      <ProductCondensed product={product} key={product._id}/>
    );
    return (list);
  }

  runningTotal = () => {
    if (this.state.runningTotal)
      return null;
  }

  render() {
    return(
      <div className="card wishlist">
        <div className="card-block">
          <h4 className="card-title">Wish List</h4>
            <ul className="list-group">
              {this.createWishlist()}
              <li className="list-group-item"><b>TOTAL: ${this.state.totalPrice}</b></li>
            </ul>
        </div>
      </div>
    );
  }
}

export default Wishlist;
