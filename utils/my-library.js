import firebase from '@/plugins/firebase'
import { bookInfo } from '@/utils/google-book-api'

var collection = firebase
  .firestore()
  .collection('MyLibraries');

const getBooksList = (uid, listName) => {
  var myLibRef = collection.doc(uid);
  var bookList = [];

  myLibRef.get().then(myLib => {
    if (! myLib.exists) {
      return bookList;
    }

    myLib.data()[listName].forEach(bookId => {
      bookInfo(bookId).then(bookInfo => {
        bookList.push(bookInfo);
      });
    });
  });

  return bookList;
}

const setBookList = (uid, listName, bookId) => {
  var myLibRef = collection.doc(uid);
  return myLibRef.get().then(myLib => {
    if (myLib.exists) {
      if (! myLib.data().hasOwnProperty(listName)) {
        let newList = {};
        newList[listName] = [bookId];
        return myLibRef.update(newList);
      }

      let listBook = myLib.data()[listName];
      if (! listBook.includes(bookId)) {
        listBook.push(bookId);
        let newList = {};
        newList[listName] = listBook;
        return myLibRef.update(newList);
      }

      return new Promise(resolve => {
        resolve();
      });
    }

    let newList = {};
    newList[listName] = [bookId];
    return myLibRef.set(newList);
  });
}

const isInMyLib = (uid, type, bookId) => {
  return collection
    .doc(uid)
    .get()
    .then(snapshot => {
      if (! snapshot.exists) {
        return false;
      }

      if (snapshot.data().hasOwnProperty(type)) {
        return snapshot.data()[type].includes(bookId);
      }

      return false;
    })
}

export const getReadingBook = (uid) => {
  return getBooksList(uid, 'readingBooks');
}

export const getFavoriteBook = (uid) => {
  return getBooksList(uid, 'favoriteBooks');
}

export const setReadingBook = (uid, bookId) => {
  return setBookList(uid, 'readingBooks', bookId);
}

export const setFavoriteBook = (uid, bookId) => {
  return setBookList(uid, 'favoriteBooks', bookId);
}

export const isReading = (uid, bookId) => {
  return isInMyLib(uid, 'readingBooks', bookId);
}

export const isFavorited = (uid, bookId) => {
  return isInMyLib(uid, 'favoriteBooks', bookId);
}
