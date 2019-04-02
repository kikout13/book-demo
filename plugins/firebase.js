import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var config = {
  apiKey: "AIzaSyAaa0ez4lv8R5VTaZ88LPd3D82WdRA89pc",
  authDomain: "book-demo-116c5.firebaseapp.com",
  databaseURL: "https://book-demo-116c5.firebaseio.com",
  projectId: "book-demo-116c5"
};
if (! firebase.apps.length) {
  firebase.initializeApp(config);
}

export default firebase;
