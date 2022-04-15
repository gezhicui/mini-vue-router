
<template>
  <div class="about">
    <h1>this is a about page </h1>
    <router-link to="/about/a"> to a</router-link>
    <router-link to="/about/b"> to b</router-link>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'about'
}
</script>

<style lang="scss" scoped>
</style>