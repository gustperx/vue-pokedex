<script setup lang="ts">
import ThePokemonLayout from "@/components/ThePokemonLayout.vue";
import TheWelcome from "@/components/TheWelcome.vue";
</script>

<template>
  <ThePokemonLayout>
    <template #header>
      <h1 class="text-3xl font-bold text-gray-900">Welcome</h1>
    </template>

    <template #content>
      <TheWelcome />
    </template>
  </ThePokemonLayout>
</template>
