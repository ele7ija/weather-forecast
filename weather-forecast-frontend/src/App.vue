<template>
  <v-app>
    <v-navigation-drawer
      app
      v-model="drawer"
      :color="color"
      :expand-on-hover="expandOnHover"
      :mini-variant="miniVariant"
      :right="right"
      :src="bg"
      absolute
      dark
      :clipped='clipped'
    >
      <v-list
        dense
        nav
        class="py-0"
      >
        <v-divider></v-divider>
        <v-tooltip right
          v-for="item in items"
          :key="item.title"
        >
          <template v-slot:activator="{ on }">
        <v-list-item
          v-on='on'
          :to="item.link"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>

        </v-list-item>

        </template>
        <span>{{ item.title }}</span>
        </v-tooltip>
      </v-list>
    </v-navigation-drawer>
    
    <v-app-bar
      app
      color="primary"
      dark
      clipped-left
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    drawer: true,
    items: [
      { title: 'Weather', icon: 'mdi-view-dashboard', link: '/weather' },
      { title: 'About', icon: 'mdi-help-box', link: '/about' },
    ],
    color: 'primary',
    right: false,
    miniVariant: true,
    expandOnHover: false,
    background: true,
    clipped: true
  }),
  computed: {
    bg () {
      return this.background ? 'https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg' : undefined
    },
  },
};
</script>
