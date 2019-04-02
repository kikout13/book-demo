<template>
  <v-dialog
    v-model="dialog"
    scrollable
    max-width="1200px"
  >
    <v-card>
      <v-card-title class="headline warning--text">
        {{ book.volumeInfo.title }}
        <v-spacer></v-spacer>
        <v-btn icon @click="toggle">
          <v-icon>close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-layout row wrap>
          <v-flex xs3 px-3>
            <v-img
              aspect-ratio="0.68"
              :src="book.volumeInfo.imageLinks.thumbnail"
            ></v-img>
          </v-flex>
          <v-flex xs9 pl-4>
            <p class="subheading grey--text">Authors:
              <span class="title title warning--text" v-for="author in book.volumeInfo.authors" :key="author">
                {{ author }}
              </span>
            </p>
            <p class="subheading grey--text">Publisher:
              <span class="title title warning--text">
                {{ book.volumeInfo.publisher }}
              </span>
            </p>
            <p class="subheading grey--text">Published date:
              <span class="title title warning--text">
                {{ book.volumeInfo.publishedDate }}
              </span>
            </p>
            <p class="subheading grey--text">
              Description:
            </p>
            <p class="body-2 warning--text" v-html="book.volumeInfo.description"></p>
            <p class="subheading grey--text">
              Page count:
              <span class="title title warning--text">
                {{ book.volumeInfo.pageCount }}
              </span>
            </p>
            <p class="subheading grey--text">Categories:
              <span class="title title warning--text" v-for="(cate, id) in book.volumeInfo.categories" :key="id">
                {{ cate }}
              </span>
            </p>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: [
    'book'
  ],
  data() {
    return {
      dialog: false
    }
  },
  created() {
    // console.log(this.book);
  },
  methods: {
    toggle() {
      this.dialog = ! this.dialog;
    }
  }
}
</script>
