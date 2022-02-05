<template>
  <div
    class="mr-1 flex rounded bg-stone-700 py-1 px-2 align-middle text-sm font-medium tracking-wide text-slate-50"
  >
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path fill-rule="evenodd" :d="svgCode" clip-rule="evenodd" />
      </svg>
    </div>
    <div class="ml-1">
      {{ text }}
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  text: string | number;
  svgCode: string;
}>();
</script>
