<script lang="ts" setup>
const { sprintName, tag, team, states } = withDefaults(
  defineProps<{
    sprintName: string
    tag: string
    team: string
    states: string[]
  }>(),
  {
    states: () => ['Resolved'],
  },
)
const emits = defineEmits(['clickState'])

const { statesSp, sp } = usePlanFact({
  sprintName,
  tag,
  team,
  states,
})

const showAll = ref(false)

const preparedStatesSp = computed(() => showAll.value ? statesSp.value : statesSp.value?.slice(0, 3))

const onStateClick = (state: string) => emits('clickState', state)
</script>

<template>
  <BaseBox>
    <template #label>
      <slot name="label">
        {{ tag }}
      </slot>
    </template>
    <template #content>
      <div pr-4>
        <span
          text-6 font-extrabold underline hover-cursor-pointer
          @click="onStateClick('Planned')"
        >Planned</span><br>
        {{ sp }}
      </div>
      <div v-for="item in preparedStatesSp" :key="item.name" pr-4>
        <span text-6 font-extrabold underline hover-cursor-pointer @click="onStateClick(item.name)">
          {{ item.name }}
        </span>
        <br>
        {{ item.value }} ({{ item.percent }}%)
      </div>
      <tabler-layout-sidebar-left-expand v-if="!showAll" @click="showAll = true" />
      <tabler-layout-sidebar-right-expand v-else @click="showAll = false" />
    </template>
  </BaseBox>
</template>
