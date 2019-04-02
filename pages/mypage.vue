<template>
<div>
  <BookList :books="readingBooks" :listTitle="'Reading books'"></BookList>
  <BookList :books="favoriteBooks" :listTitle="'Favorite books'"></BookList>
</div>
</template>

<script>
import firebase from '@/plugins/firebase'
import BookList from '@/components/BookList'
import { bookInfo } from '@/utils/google-book-api'
import { getReadingBook, getFavoriteBook } from '@/utils/my-library'

export default {
  components: {
    BookList
  },
  data() {
    return {
      readingBooks: [],
      favoriteBooks: []
    }
  },
  created() {
      this.readingBooks = getReadingBook(this.$store.getters.currentUser.uid);
      this.favoriteBooks = getFavoriteBook(this.$store.getters.currentUser.uid);
  }
}
</script>
