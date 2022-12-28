<script setup>
  import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>

    <div class="container max-w-7xl">
      <nav>
        <RouterLink to="/employees" class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Employees</RouterLink>
        <RouterLink to="/employee/new" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">New Employee</RouterLink>
      </nav>
    </div>
  </header>

  <main class="container max-w-7xl min-h-screen">
    <RouterView />
  </main>
</template>
