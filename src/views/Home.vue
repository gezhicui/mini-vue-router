
<template>
  <div class="home">
    <h1>this is a home page </h1>
    <button @click="toAbout">click to push</button>
    <button @click="replaceAbout">click to replace</button>
  </div>
</template>

<script>
export default {
  name: 'home',
  methods: {
    toAbout() {
      this.$router.push('/about/b')
    },
    replaceAbout() {
      this.$router.replace('/about/b')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>