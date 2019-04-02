<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="500px"
  >
    <v-card>
      <v-card-title class="headline warning--text">Sign in</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form class="px-3" ref="loginForm" @keyup.enter="submit">
          <v-text-field
            name="email"
            label="Email"
            hint="Enter your email address"
            prepend-icon="email"
            v-model="email"
            :rules="emailValidate"
          ></v-text-field>
          <v-text-field
            name="password"
            label="Password"
            type="password"
            hint="At least 8 characters"
            min="8"
            prepend-icon="lock"
            v-model="password"
            :rules="passwordValidate"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="" flat @click="cancel">Cancel</v-btn>
        <v-btn color="warning" flat @click="submit">Sign in</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import firebase from '@/plugins/firebase'

export default {
  data() {
    return {
      // dialog: false,
      email: '',
      password: '',
      emailValidate: [
        email => !! email || 'Email is required!',
        email => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) || 'Email must be valid'
      ],
      passwordValidate: [
        password => !! password || 'Password is required!',
        password => password.length >= 8 || 'Password must be at least 8 characters'
      ]
    }
  },
  computed: {
    dialog() {
      return this.$store.state.logInForm;
    }
  },
  methods: {
    cancel() {
      this.$store.commit('toggleLogInForm');
      this.email = '';
      this.password = '',
      this.$refs.loginForm.resetValidation();
    },
    submit() {
      if (this.$refs.loginForm.validate()) {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password);
        this.$store.commit('toggleLogInForm');
        this.$refs.loginForm.resetValidation();
      }
    }
  }
}
</script>
