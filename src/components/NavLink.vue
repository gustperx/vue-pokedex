<script setup lang="ts">
import { computed } from "vue";
import { RouterLink } from "vue-router";

// https://v3.vuejs.org/api/sfc-script-setup.html#typescript-only-features
const props = defineProps<{
  to: string;
  name: string;
}>();

const isExternalLink = computed(() => props.to.startsWith("http"));
</script>

<!-- https://router.vuejs.org/api/#v-slot-api-3-1-0 -->
<template>
  <a
    v-if="isExternalLink"
    class="rounded-md px-3 py-2 text-sm font-medium text-gray-200 hover:bg-sky-800 hover:text-white"
    :href="to"
    target="_blank"
    >{{ name }}</a
  >

  <RouterLink
    v-else
    :to="{ name: to }"
    v-slot="{ href, navigate, isActive }"
    custom
  >
    <a
      class="rounded-md px-3 py-2 text-sm font-medium"
      :href="href"
      :class="
        isActive
          ? 'bg-teal-600 text-white'
          : 'text-gray-200 hover:bg-sky-800 hover:text-white'
      "
      @click="navigate"
      >{{ name }}</a
    >
  </RouterLink>
</template>
