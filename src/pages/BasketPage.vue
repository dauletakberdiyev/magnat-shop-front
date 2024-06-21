<template>
  <Header/>
  <Search/>



  <Footer/>
</template>

<script setup>
import Header from "../components/Header.vue";
import Search from "../components/Search.vue";
import Footer from "../components/Footer.vue";
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";

const route = useRoute()

onMounted(() => {
  console.log(route.query)
})
</script>

<style scoped>

</style>