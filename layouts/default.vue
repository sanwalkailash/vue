<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click.stop="miniVariant = !miniVariant">
          <v-list-item-action>
            <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            {{ miniVariant ? '' : 'minimize' }}
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="appName" />
      <v-spacer />
      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
      <Footer/>
    </v-main>
    <BottomNavigation/>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="true"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Live Stats</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
import BottomNavigation from '../components/BottomNavigation'
import Footer from '../components/Footer'
export default {
  data () {
    return {
      clipped: true,
      drawer: true,
      fixedFooter: false,
      items: [
        {
          icon: 'mdi-home',
          title: 'home',
          to: '/'
        },
        {
          icon: 'mdi-run',
          title: 'explore',
          to: '/farms'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'events',
          to: '/events'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      appName: this.$store.getters.getLanguage.hindi.appName
    }
  },
  components: {
    BottomNavigation,
    Footer
  }
}
</script>
