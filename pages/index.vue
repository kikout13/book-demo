<template>
  <div>
    <BookList :books="mostReadingBookInfo" :listTitle="'Most reading books'"></BookList>
    <BookList :books="mostFavoriteBookInfo" :listTitle="'Most favorited books'"></BookList>
  </div>
</template>

<script>
import { mostReadingBook, mostFavoriteBook } from '@/utils/social-histories'
import BookList from '@/components/BookList'

export default {
  components: {
    BookList
  },
  data() {
    return {
      mostReadingBook: null,
      mostFavoriteBook: null
    }
  },
  computed: {
    mostReadingBookInfo() {
      var books = [];
      if (this.mostReadingBook) {
        this.mostReadingBook
          .sort((a, b) => {
            return b.count - a.count;
          })
          .slice(0,4)
          .forEach(book => {
            books.push(book.info);
          });
      }

      return books;
    },
    mostFavoriteBookInfo() {
      var books = [];
      if (this.mostFavoriteBook) {
        this.mostFavoriteBook
          .sort((a, b) => {
            return b.count - a.count;
          })
          .slice(0,4)
          .forEach(book => {
            books.push(book.info);
          });
      }

      return books;
    },
  },
  created() {
    this.mostReadingBook = mostReadingBook();
    this.mostFavoriteBook = mostFavoriteBook();
  }
}
</script>
