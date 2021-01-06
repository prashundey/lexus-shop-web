import NotificationService, {NOTIF_WISHLIST_CHANGED} from './notification-service';

let ns = new NotificationService();

let instance = null;
var wishlist = [];

class DataService {
  constructor() {
    // Singleton Instance:
    // Only one instance of data service can exist
    if (!instance)
      instance = this;
    return instance;
  }

  addWishlistItem = (item) => {
    wishlist.push(item);
    ns.postNotification(NOTIF_WISHLIST_CHANGED, wishlist);
  }

  removeWishlistItem = (item) => {
    for (var i = 0; i < wishlist.length; i++) {
      if (wishlist[i]._id === item._id) {
        wishlist.splice(i, 1);
        ns.postNotification(NOTIF_WISHLIST_CHANGED, wishlist);
        break;
      }
    }
  }

  itemOnWishlist = item => {
    for (var i = 0; i < wishlist.length; i++) {
      if (wishlist[i]._id === item._id) {
        return true;
      }
    }
    return false;
  }

}

export default DataService;
