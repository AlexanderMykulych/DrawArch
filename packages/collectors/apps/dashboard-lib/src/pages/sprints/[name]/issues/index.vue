<script lang="ts" setup>
const props = defineProps<{ name: string; issue: string }>()
</script>

<template>
  <div>
    <IssueList :sprint-name="name" team="BigTeam" />
  </div>
</template>
