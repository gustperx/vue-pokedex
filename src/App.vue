<script setup lang="ts">
import { RouterView } from "vue-router";
import TheNavbar from "./components/TheNavbar.vue";
import TheFooter from "./components/TheFooter.vue";
</script>

<template>
  <div class="min-h-full bg-slate-100">
    <!-- <div class="flex h-screen min-h-full flex-col justify-between bg-slate-100"> -->
    <TheNavbar />
    <RouterView />
    <TheFooter />
  </div>
</template>
