import firebase from '@/plugins/firebase'
import { bookInfo } from '@/utils/google-book-api'

var collection = firebase
  .firestore()
  .collection('MyLibraries');

const bookCounter = async (type) => {
  var list = [];

  await collection.get().then(snapshot => {
    if (snapshot.docs.length == 0) {
      return [];
    }

    snapshot.docs.forEach(doc => {
      if (doc.data().hasOwnProperty(type)) {
        doc.data()[type].forEach(bookId => {
          var book = list.find(e => {
            return e.bookId === bookId;
          });
          if (typeof(book) === 'undefined') {
            list.push({
              bookId: bookId,
              count: 1
            });
          } else {
            var key = list.indexOf(book);
            book.count = book.count + 1;
            list[key] = book;
          }
        })
      }
    });
  });

  return list;
}

export const mostReadingBook = () => {
  var books = [];

  bookCounter('readingBooks').then(list => {
    list.forEach(book => {
      bookInfo(book.bookId).then(info => {
        book.info = info;
        books.push(book);
      });
    })
  });

  return books;
}

export const mostFavoriteBook = () => {
  var books = [];

  bookCounter('favoriteBooks').then(list => {
    list.forEach(book => {
      bookInfo(book.bookId).then(info => {
        book.info = info;
        books.push(book);
      });
    })
  });

  return books;
}

const countByType = (type, bookId) => {
  return collection
    .where(type, 'array-contains', bookId)
    .get()
    .then(snapshot => {
      return snapshot.docs.length;
    })
}

export const countReading = (bookId) => {
  return countByType('readingBooks', bookId);
}

export const countFavorite = (bookId) => {
  return countByType('favoriteBooks', bookId);
}
