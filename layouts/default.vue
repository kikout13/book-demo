<template>
  <v-app dark class='lighten-4 warning--text'>
    <v-toolbar app flat class="warning--text">
      <v-toolbar-side-icon
        class="warning--text"
        @click="toggleNavigation"
      ></v-toolbar-side-icon>
      <nuxt-link to="/" style="text-decoration: none;">
        <v-toolbar-title class="font-weight-bold">
          Book Demo
        </v-toolbar-title>
      </nuxt-link>

      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-text-field
          label="Search..."
          append-icon="search"
          single-line
          v-model="searchWord"
          @keyup.enter="search"
          class="px-3"
        ></v-text-field>
      </v-toolbar-items>

      <BeforeLoginToolbar v-if="! isLogin" />
      <AfterLoginToolbar v-if="isLogin" :currentUser="currentUser" />

    </v-toolbar>

    <LeftMenu ref="menu" :isLogin="isLogin"/>

    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import BeforeLoginToolbar from './BeforeLoginToolbar';
import AfterLoginToolbar from './AfterLoginToolbar';
import LeftMenu from './LeftMenu';
import firebase from '@/plugins/firebase';
import { searchBook } from '@/utils/google-book-api';

export default {
  components: {
    BeforeLoginToolbar,
    AfterLoginToolbar,
    LeftMenu
  },
  data() {
    return {
      searchWord: '',
      snackbar: false,
      y: 'top',
      x: null,
      mode: '',
      timeout: 4000,
      text: 'Added to library!'
    }
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLogin;
    },
    currentUser() {
      return this.$store.getters.currentUser;
    }
  },
  methods: {
    search() {
      if (this.searchWord) {
        this.$store.commit('setSearchWord', this.searchWord);
        searchBook(this.searchWord).then(res => {
          this.$store.commit('setSearchBooksResult', res);
        });
        this.$router.push('/search');
      }
    },
    toggleNavigation() {
      this.$refs.menu.toggle();
    }
  }
}
</script>
