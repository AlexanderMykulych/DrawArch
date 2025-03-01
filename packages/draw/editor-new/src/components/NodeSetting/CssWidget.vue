<script lang="ts" setup>
/* eslint-disable */
import { computed, onMounted, onScopeDispose, ref } from 'vue';
import { useDebounce } from '@vueuse/core';
import { useCurrentEditorState } from '../../core/useCurrentEditorState';
import type { PredefBlock } from './../PredefinedSetting/PredefinedSetting';
import { Predef, PredefCategory } from './../PredefinedSetting/PredefinedSetting';
import { onWheelHorScroll } from './onWheelHorScroll';

const props = defineProps<{
    preparedPredefs: PredefBlock[]
    config: any
}>();

const { activeNode } = useCurrentEditorState();

const scrollEl = ref<HTMLElement | null>(null);
const activeCategory = ref<string | null>(PredefCategory.Rough);
const showCategory = ref(false);
const categories = Object.entries(PredefCategory).map(x => ({
    name: x[0],
    key: x[1],
}));
const selectCategory = (category: string) => {
    showCategory.value = false;
    activeCategory.value = category;
};

const filteredPredefs = computed(() => {
    if (activeCategory.value)
        return props.preparedPredefs?.filter((x: any) => x.category === activeCategory.value);

    return props.preparedPredefs;
});
const debouncedPredef = useDebounce(filteredPredefs, 400);

const applyPredef = (predef: PredefBlock) => {
    activeNode.css = {
        ...predef.item.blockStyle.css,
    };
};
</script>

<template>
  <div class="flex flex-nowrap h-full space-x-2 items-center">
    <template v-if="showCategory">
      <div
        ref="scrollEl"
        class="
                    pl-5
                    pr-5
                    flex flex-nowrap
                    space-x-2
                    h-full
                    content-center
                    overflow-x-auto overflow-y-hidden
                    scrollbar-thin
                    scrollbar-thumb-gray-300
                    scrollbar-track-gray-100
                    css-widget-scrollbar
                "
        @wheel.stop.prevent="onWheelHorScroll"
      >
        <div
          v-for="category in categories"
          style="min-width: 100px; height: 90%;"
          class="
                        h-full
                        flex
                        justify-center
                        content-center
                        border-1
                        bg-white
                        shadow-lg
                    "
          @click="selectCategory(category.key)"
        >
          <div class="flex flex-col justify-center">
            <span
              class="text-center text-gray-600 underline-solid"
            >
              {{ category.name }}
            </span>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <button @click="showCategory = true">
        <i-ph:arrow-square-left-fill />
      </button>
      <div
        ref="scrollEl"
        class="
                    flex flex-nowrap
                    space-x-2
                    h-full
                    content-center
                    overflow-x-auto overflow-y-hidden
                    scrollbar-thin
                    scrollbar-thumb-gray-300
                    scrollbar-track-gray-100
                    css-widget-scrollbar
                "
        @wheel.stop.prevent="onWheelHorScroll"
      >
        {{ !debouncedPredef || debouncedPredef.length === 0 ? "Comming soon..." : "" }}
        <template v-for="predef in debouncedPredef" :key="predef.name">
          <div style="min-width: 200px" @click.stop.prevent="applyPredef(predef)">
            <svg
              width="90%"
              height="90%"
              :viewBox="`0 0 ${predef?.item?.positioning?.w} ${predef?.item?.positioning?.h}`"
            >
              <slot
                v-if="config.path === 'css'"
                :key="predef.name"
                name="preview"
                :item="predef.item"
              />
            </svg>
          </div>
        </template>
      </div>
    </template>
  </div>
</template>

<style scoped>
.css-widget-scrollbar::-webkit-scrollbar {
    height: 3px;
}
</style>
