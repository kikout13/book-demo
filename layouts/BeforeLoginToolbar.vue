<template>
  <v-toolbar-items>
    <v-btn flat class="warning--text" @click="register">Sign up</v-btn>
    <v-btn flat class="warning--text" @click="login">Sign in</v-btn>
    <RegisterForm ref="registerForm"></RegisterForm>
    <LoginForm ref="loginForm"></LoginForm>
  </v-toolbar-items>
</template>

<script>
import RegisterForm from '@/components/RegisterForm';
import LoginForm from '@/components/LoginForm';

export default {
  components: {
    RegisterForm,
    LoginForm
  },
  methods: {
    register() {
      this.$store.commit('toggleRegisterForm');
    },
    login() {
      this.$store.commit('toggleLogInForm');
    }
  }
}
</script>
