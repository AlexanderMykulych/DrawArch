<script lang="ts" setup>
/* eslint-disable */
import type { RectPositioning } from 'coya-core';

const props = defineProps<{ positioning: RectPositioning }>();
</script>

<template>
  <rect :height="positioning.h" :width="positioning.w" :x="positioning.x" :y="positioning.y" />
</template>
