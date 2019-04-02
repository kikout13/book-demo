<template>
  <v-layout row wrap justify-center>
    <v-flex xs6 md6>
      <v-card flat tile>
        <v-layout justify-center align-center class="py-4">
          <v-avatar size="200">
            <img :src="avartar" alt="profile image">
          </v-avatar>
        </v-layout>
        <v-divider></v-divider>
        <v-card-text>
          <v-form class="px-3" ref="loginForm" @keyup.enter="submit">
            <v-text-field
              name="email"
              label="Email"
              v-model="email"
              disabled
            ></v-text-field>
            <v-text-field
              name="displayName"
              label="Nickname"
              v-model="displayName"
            ></v-text-field>
            <v-text-field
              name="photoURL"
              label="Avartar"
              v-model="photoURL"
            ></v-text-field>
          </v-form>
          <v-card-actions class="justify-center">
            <v-btn color="warning black--text" @click="updateProfile">Update</v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-flex>

    <v-snackbar
      v-model="snackbar"
      :bottom="y === 'bottom'"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :right="x === 'right'"
      :timeout="timeout"
      :top="y === 'top'"
      :vertical="mode === 'vertical'"
      color="warning black--text"
    >
      {{ text }}
      <v-btn
        color="black"
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-layout>
</template>

<script>
import firebase from '@/plugins/firebase'

export default {
  data() {
    return {
      email: '',
      displayName: '',
      photoURL: '',
      snackbar: false,
      y: 'top',
      x: null,
      mode: '',
      timeout: 4000,
      text: 'Profile updated!'
    }
  },
  computed: {
    avartar() {
      return this.$store.getters.currentUser.photoURL || "/default-user-image.png";
    }
  },
  created() {
    this.email = this.$store.getters.currentUser.email;
    this.displayName = this.$store.getters.currentUser.displayName;
    this.photoURL = this.$store.getters.currentUser.photoURL || '';
  },
  methods: {
    updateProfile() {
      var user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: this.displayName,
        photoURL: this.photoURL
      }).then(() => {
        this.$store.commit('setUser', firebase.auth().currentUser);
        this.snackbar = true;
      })
    }
  }
}
</script>
