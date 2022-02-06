<template>
  <img
    v-if="!showPokemon"
    :src="imgSrc"
    class="h-48 w-48 brightness-0"
    alt="Pokémon"
    loading="lazy"
  />
  <img v-else :src="imgSrc" class="h-48 w-48" alt="Pokémon" loading="lazy" />
</template>

<script lang="ts" setup>
defineProps<{
  imgSrc: string;
  showPokemon: boolean;
}>();
</script>
