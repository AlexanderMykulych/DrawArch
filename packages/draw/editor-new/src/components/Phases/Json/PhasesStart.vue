<script lang="ts" setup>
/* eslint-disable */
import type { WidgetConfig } from 'coya-json-editor';
import { computed } from 'vue';
import { usePhases } from '../usePhases';

const props = defineProps<{
    config: WidgetConfig
}>();

const { setCurrentPhase, currentPhase, phaseCount, addNewPhase } = usePhases();
</script>

<template>
  <div class="h-full text-2xl flex text-gray-500">
    <button title="Add a new phase at the start">
      <i-fluent:tab-new-20-filled
        class="cursor-finger h-full"
        @click="addNewPhase(-1)"
      />
    </button>
  </div>
</template>
