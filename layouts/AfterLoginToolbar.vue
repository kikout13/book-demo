<template>
  <v-toolbar-items>
    <v-tooltip bottom>
      <v-btn flat class="px-0" slot="activator">
        <nuxt-link to="/mypage" style="text-decoration: none;">
        <v-icon color="warning">library_books</v-icon>
        </nuxt-link>
      </v-btn>
      <span>My Library</span>
    </v-tooltip>

    <v-layout justify-center align-center class="px-2">
      <nuxt-link to="/settings">
        <v-tooltip bottom>
          <v-avatar class="grey lighten-2" size="40" slot="activator">
            <img :src="avartar" alt="alt">
          </v-avatar>
          <span>{{ $store.getters.currentUser.displayName || currentUser.email }}</span>
        </v-tooltip>
      </nuxt-link>
    </v-layout>
  </v-toolbar-items>
</template>

<script>
export default {
  props: [
    'currentUser'
  ],
  computed: {
    avartar() {
      return this.$store.getters.currentUser.photoURL || "/default-user-image.png";
    }
  }
}
</script>
