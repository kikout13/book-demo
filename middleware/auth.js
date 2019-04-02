import firebase from '@/plugins/firebase'

export default function({ store, route, redirect }) {
  return new Promise(resolve => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        store.commit('setUser', user);
      }
      if ((route.fullPath === '/mypage' || route.fullPath === '/settings' ) && ! user) {
        return redirect('/');
      }
      resolve(user);
    });
  });
}
