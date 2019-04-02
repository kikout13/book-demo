<template>
  <v-layout row wrap v-if="searchBooks">
    <Book v-for="book in searchBooks" :key="book.id" :book="book"></Book>
  </v-layout>
</template>

<script>
import Book from '@/components/Book'
import { searchBook } from '@/utils/google-book-api';

export default {
  components: {
    Book
  },
  computed: {
    searchBooks() {
      return this.$store.getters.searchBooks;
    }
  }
}
</script>
