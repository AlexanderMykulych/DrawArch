<script setup lang="ts">
const props = defineProps<{
  initial: number
}>()

const emit = defineEmits(['test', 'test2'])

emit()

const { count, inc, dec } = useCounter(props.initial)
</script>

<template>
  <div>
    {{ count }}
    <button class="inc" @click="inc()">
      +
    </button>
    <button class="dec" @click="dec()">
      -
    </button>
  </div>
</template>
