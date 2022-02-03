<script lang="ts" setup>
import ThePokemonLayout from "@/components/ThePokemonLayout.vue";
import ThePokemonGame from "@/components/PokemonGame/ThePokemonGame.vue";
</script>

<template>
  <ThePokemonLayout>
    <template #header>
      <h1 class="text-3xl font-bold text-gray-900">Pokemon Game</h1>
    </template>

    <template #content>
      <ThePokemonGame />
    </template>
  </ThePokemonLayout>
</template>
