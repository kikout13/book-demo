import firebase from '@/plugins/firebase'
import Vue from 'vue'

export const strict = false;

export const state = () => ({
  user: null,
  registerForm: false,
  logInForm: false,
  searchWord: '',
  searchBooks: null,
})

export const mutations = {
  setUser(state, user) {
    state.user = {...user}
  },
  resetUser(state) {
    state.user = null;
  },
  setSearchWord(state, searchWord) {
    state.searchWord = searchWord;
  },
  setSearchBooksResult(state, searchBooks) {
    state.searchBooks = searchBooks;
  },
  toggleRegisterForm(state) {
    state.registerForm = ! state.registerForm;
  },
  toggleLogInForm(state) {
    state.logInForm = ! state.logInForm;
  }
}

export const getters = {
  isLogin: state => {
    return !! state.user;
  },
  currentUser: state => {
    return state.user;
  },
  searchBooks: state => {
    return state.searchBooks;
  }
}
