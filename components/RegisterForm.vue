<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="500px"
  >
    <v-card>
      <v-card-title class="headline warning--text">Sign up</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form class="px-3" ref="registerForm">
          <v-text-field
            name="email"
            label="Email"
            id="r-email"
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
          <v-text-field
            name="passwordConfirm"
            label="Password confirm"
            type="password"
            hint="Enter your confirm password"
            min="8"
            prepend-icon="lock"
            v-model="passwordConfirm"
            :rules="passwordConfirmValidate"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="" flat @click="cancel">Cancel</v-btn>
        <v-btn color="warning" flat @click="submit">Submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import firebase from '@/plugins/firebase';

export default {
  data() {
    return {
      // dialog: false,
      email: '',
      password: '',
      passwordConfirm: '',
      emailValidate: [
        email => !! email || 'Email is required!',
        email => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) || 'Email must be valid'
      ],
      passwordValidate: [
        password => !! password || 'Password is required!',
        password => password.length >= 8 || 'Password must be at least 8 characters'
      ],
      passwordConfirmValidate: [
        passwordConfirm => passwordConfirm === this.password || 'Confirm password must be same as password'
      ]
    }
  },
  computed: {
    dialog() {
      return this.$store.state.registerForm;
    }
  },
  methods: {
    cancel() {
      this.$store.commit('toggleRegisterForm');
      this.email = '';
      this.password = '',
      this.passwordConfirm = '',
      this.$refs.registerForm.resetValidation();
    },
    submit() {
      if (this.$refs.registerForm.validate()) {
        console.log(this.email, this.password, this.passwordConfirm);
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(credential => {
          console.log(credential);
        });
      }
    }
  }
}
</script>
