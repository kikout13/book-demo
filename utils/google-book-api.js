import axios from 'axios';

export const searchBook = async (searchWord) => {
  var searchPhrase = searchWord.replace(' ', '+');
  try {
    const response = await axios.get('https://www.googleapis.com/books/v1/volumes?q=' + searchPhrase + '&langRestrict=ja');
    return response.data.items;
  } catch (error) {
    console.log(error);
  }
}

export const bookInfo = async (bookId) => {
  try {
    const response = await axios.get('https://www.googleapis.com/books/v1/volumes/' + bookId + '?langRestrict=ja');
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
