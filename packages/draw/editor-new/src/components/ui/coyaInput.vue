<script lang="ts" setup>
/* eslint-disable */
const props = defineProps<{
    label: string
    modelValue: any
}>();
</script>

<template>
  <div class="md:flex md:items-center mb-6">
    <div class="md:w-1/6">
      <label
        class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
        for="inline-full-name"
      >{{ label }}</label>
    </div>
    <div class="md:w-4/5">
      <input
        id="username"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        :value="modelValue"
        :placeholder="label"
        @input="$emit('update:modelValue', $event.target.value)"
      >
    </div>
  </div>
</template>
