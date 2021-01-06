export const NOTIF_WISHLIST_CHANGED = "NOTIF_WISHLIST_CHANGED";
let instance = null;
var observers = {};
// key: notifName -> [{observer, callBack},{...},{...}]

class NotificationService {
  constructor() {
    // Singleton Instance:
    // Only one instance of notification service can exist
    if (!instance)
      instance = this;
    return instance;
  }

  addObserver = (notifName, observer, callBack) => {
    let obs = observers[notifName];

    if (!obs)
      observers[notifName] = [];

    let obj = {observer: observer, callBack: callBack};
    observers[notifName].push(obj);
  }

  removeObserver = (notifName, observer) => {
    var obs = observers[notifName];

    if (obs) {
      for (var i = 0; i < obs.length; i++) {
        if(observer === obs[i].observer) {
          obs.splice(i, 1);
          observers[notifName] = obs;
          break;
        }
      }
    }
  }

  postNotification = (notifName, data) => {
    var obs = observers[notifName];
    for (var i = 0; i < obs.length; i++) {
      var obj = obs[i];
      obj.callBack(data);
    }
  }

}

export default NotificationService;
