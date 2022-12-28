<script>
import { RouterLink, RouterView } from 'vue-router'

export default {
  data() {
    return {
      drawer: false
    }
  },
}
</script>

<template>
  <v-app>

    <v-navigation-drawer v-model="drawer" app clipped hide-overlay>
      <v-list>
        <v-list-item prepend-avatar="https://randomuser.me/api/portraits/men/6.jpg" title="Valentyn Ipolitov"
          subtitle="sv.vartey@gmail.com"></v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <RouterLink to="/employees">
          <v-list-item prepend-icon="mdi-account-multiple" title="Employees" value="employees">
          </v-list-item>
        </RouterLink>
        <RouterLink to="/employee/new">
          <v-list-item prepend-icon="mdi-account-plus" title="Add employee" value="add_employee">
          </v-list-item>
        </RouterLink>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app absolute color="indigo darken-2" dark shrink-on-scroll prominent scroll-target="#scrolling-techniques">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>{{ this.$route.name }}</v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>
