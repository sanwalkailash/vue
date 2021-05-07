<template>
  <v-row justify="center" align="center">
  <Listing/>
  </v-row>
</template>

<script>
import Listing from '../components/Listing'
export default {
  middleware: ['isAuthenticated'],
  components: {
    Listing
  }
}
</script>
