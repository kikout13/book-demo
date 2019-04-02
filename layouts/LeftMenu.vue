<template>
  <v-navigation-drawer
    app
    temporary
    v-model="drawer"
  >
    <v-list>
      <v-list-tile class="px-3" router :to="'/'">
        <v-list-tile-action>
          <v-icon class="warning--text">home</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title class="warning--text">Homepage</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile class="px-3" v-if="! isLogin" @click="register">
        <v-list-tile-action>
          <v-icon class="warning--text">person_add</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title class="warning--text">Sign up</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile class="px-3" v-if="! isLogin" @click="login">
        <v-list-tile-action>
          <v-icon class="warning--text">person</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title class="warning--text">Sign in</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile class="px-3" v-if="isLogin" router :to="'/mypage'">
        <v-list-tile-action>
          <v-icon class="warning--text">library_books</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title class="warning--text">My Library</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile class="px-3" v-if="isLogin" router :to="'/settings'">
        <v-list-tile-action>
          <v-icon class="warning--text">settings</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title class="warning--text">Settings</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile class="px-3" v-if="isLogin" @click="signOut">
        <v-list-tile-action>
          <v-icon class="warning--text">exit_to_app</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title class="warning--text">Sign out</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import firebase from '@/plugins/firebase'

export default {
  props: [
    'isLogin'
  ],
  data() {
    return {
      drawer: false
    }
  },
  methods: {
    toggle() {
      this.drawer = ! this.drawer;
    },
    register() {
      this.drawer = ! this.drawer;
      this.$store.commit('toggleRegisterForm');
    },
    login() {
      this.drawer = ! this.drawer;
      this.$store.commit('toggleLogInForm');
    },
    signOut() {
      firebase.auth().signOut();
      this.$store.commit('resetUser');
      this.drawer = ! this.drawer;
    }
  }
}
</script>
