<template>
  <div class="mx-auto">
    <a :href="url" target="_blank">
      <div class="flex items-center justify-center text-sky-800">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          class="bi bi-github h-16 w-16"
          viewBox="0 0 16 16"
        >
          <path :d="iconSvg" />
        </svg>
      </div>
      <p class="my-4 text-2xl font-medium">{{ name }}</p>
    </a>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  iconSvg: string;
  name: string;
  url: string;
}>();
</script>
