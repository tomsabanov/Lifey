import moment from 'moment'
var Datastore = require ('react-native-local-mongodb')
var db = new Datastore ({filename:'mongodb',autoload: true});

import { NativeModules } from 'react-native';
let {Audio} = NativeModules; // lahko da je več stoo modulov tukile... nevem...

import PushNotification from 'react-native-push-notification'
PushNotification.configure({
    // (required) Called when a remote or local notification is opened or received
    onNotification: function(notification) {
      // console.log( 'NOTIFICATION:', notification );
    },
    popInitialNotification: true,
});

export default utils = {
  moment,
  today:moment(),
  yesterday:moment().add(-1,'days'),
  tommorow:moment().add(1,'days'),
  Audio,
  db,
  PushNotification,
}
