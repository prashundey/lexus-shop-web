import React, {Component} from 'react';
import './product.css';
import DataService from '../services/data-service';
import NotificationService, {NOTIF_WISHLIST_CHANGED} from '../services/notification-service';

let ds = new DataService();
let ns = new NotificationService();

class Product extends Component {

  constructor(props) {
    super(props);

    this.state = {onWishlist: ds.itemOnWishlist(this.props.product)};

    // Bind Functions
    this.onButtonClicked = this.onButtonClicked.bind(this);
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
    this.setState({onWishlist: ds.itemOnWishlist(this.props.product)})
  }


  onButtonClicked = () => {
    if (this.state.onWishlist)
      ds.removeWishlistItem(this.props.product);
    else
        ds.addWishlistItem(this.props.product);
    // Product -> DataService -> NotificationService -> Wishlist
  }

  render() {

    var btnClass;
    if (this.state.onWishlist)
      btnClass = "btn btn-danger";
    else
      btnClass = "btn btn-primary";

    return(
      <div className="card product">
        <img className="card-img-top" alt="Product" src={this.props.product.imgURL}></img>
        <div className="card-block">
          <h4 className="card-title">{this.props.product.title}</h4>
          <p className="card-text">Price: ${this.props.product.price}</p>
          <button onClick={() => this.onButtonClicked()} className={btnClass}>
            {this.state.onWishlist ? "Remove From Wishlist" : "Add to Cart"}
          </button>
        </div>
      </div>
    );
  }
}

export default Product;
