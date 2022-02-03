<template>
  <div class="relative mx-auto py-2">
    <div class="flex flex-col sm:flex-row sm:justify-center">
      <input
        type="text"
        placeholder="Mínimo 3 caracteres"
        class="rounded-lg px-4 py-2"
        v-model="search"
        @input="updateValue"
      />
      <span class="mx-1 mt-1 sm:mt-0"></span>
      <button
        type="button"
        class="rounded-lg bg-gray-700 px-3 py-2 text-sm font-medium text-white hover:bg-gray-800"
        @click="clickClear"
      >
        Reset
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const search = ref();

const emit = defineEmits<{
  (e: "on:change", search: string): void;
  (e: "on:click"): void;
}>();

const updateValue = () => {
  emit("on:change", search.value);
};

const clickClear = () => {
  search.value = "";
  emit("on:click");
};
</script>
