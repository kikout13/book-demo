<template>
    <v-flex xs12 sm6 md3 pa-3>
      <v-hover>
        <v-card hover raised>
          <v-img
            :src="book.volumeInfo.imageLinks.thumbnail"
            aspect-ratio="0.68"
            :alt="book.volumeInfo.title"
            @click="showBookDetail"
          ></v-img>

          <v-card-title primary-title @click="showBookDetail">
            <div>
              <h4 class="title mb-4">{{ book.volumeInfo.title }}</h4>
              <div class="grey--text">{{ shortDescription }}</div>
            </div>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-tooltip top>
              <v-btn icon @click="like(book.id)" :class="{ 'red--text': isFavorited && isLogin }" slot="activator">
                <v-icon>favorite</v-icon>
              </v-btn>
              <span>{{ favorites }} people liked this book</span>
            </v-tooltip>
            <span class="subheading mr-2">{{ favorites }}</span>
            <v-tooltip top>
              <v-btn icon slot="activator">
                <v-icon>school</v-icon>
              </v-btn>
              <span>{{ reading }} people are reading this book</span>
            </v-tooltip>
            <span class="subheading mr-2">{{ reading }}</span>
            <v-tooltip top>
              <v-btn icon v-if="isLogin" @click="addReadingBook(book.id)" :class="{ 'warning--text': isReading && isLogin }" slot="activator">
                <v-icon>bookmark</v-icon>
              </v-btn>
              <span>Add to my reading book</span>
            </v-tooltip>
          </v-card-actions>
        </v-card>
      </v-hover>
      <BookDetail ref="detail" :book="book"></BookDetail>
    </v-flex>
</template>

<script>
import firebase from '@/plugins/firebase'
import { setReadingBook, setFavoriteBook, isReading, isFavorited } from '@/utils/my-library'
import { countReading, countFavorite } from '@/utils/social-histories'
import BookDetail from '@/components/BookDetail'

export default {
  components: {
    BookDetail
  },
  props: [
    'book'
  ],
  data() {
    return {
      favorites: 0,
      reading: 0,
      isFavorited: false,
      isReading: false
    }
  },
  created() {
    countReading(this.book.id).then(readingCount => {
      this.reading = readingCount;
    });

    countFavorite(this.book.id).then(favoriteCount => {
      this.favorites = favoriteCount;
    });

    if (this.$store.getters.isLogin) {
      isReading(this.$store.getters.currentUser.uid, this.book.id).then(isReading => {
        this.isReading = isReading;
      });
      isFavorited(this.$store.getters.currentUser.uid, this.book.id).then(isFavorited => {
        this.isFavorited = isFavorited;
      });
    }
  },
  computed: {
    shortDescription() {
      return this.book.volumeInfo.description ? this.book.volumeInfo.description.substring(0, 40) + '...' : null;
    },
    isLogin() {
      return this.$store.getters.isLogin;
    }
  },
  methods: {
    addReadingBook(bookId) {
      setReadingBook(this.$store.getters.currentUser.uid, bookId).then(() => {
        this.isReading = true;
      });
    },
    like(bookId) {
      setFavoriteBook(this.$store.getters.currentUser.uid, bookId).then(() => {
        this.favorites += 1;
        this.isFavorited = true;
      });
    },
    showBookDetail() {
      this.$refs.detail.toggle();
    }
  }
}
</script>

