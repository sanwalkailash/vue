<template>
  <v-row justify="center" align="center">
    Hello there !
  </v-row>
</template>

<script>
export default {
  middleware: ['isAuthenticated'],
  components: {
  }
}
</script>
