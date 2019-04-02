<template>
  <div class="py-4">
    <h1>{{ listTitle }}</h1>
    <v-divider class="my-3"></v-divider>
    <v-layout row wrap v-if="books.length > 0">
      <Book v-for="book in books" :key="book.id" :book="book"></Book>
    </v-layout>
    <v-layout row wrap v-else>
      <p class="grey--text">* You don't have reading book</p>
    </v-layout>
  </div>
</template>

<script>
import Book from '@/components/Book'

export default {
  props: [
    'listTitle',
    'books'
  ],
  components: {
    Book
  }
}
</script>
