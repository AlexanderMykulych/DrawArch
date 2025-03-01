<script setup lang="ts">
/* eslint-disable */
import { Architecture } from 'coya-core';
import {
    computed,
    onMounted,
    onScopeDispose,
    reactive,
    Ref,
    ref,
    shallowRef,
} from 'vue';
import { EnabledEditor } from '../core';
import { enableEditor } from '../core/enableEditor';
import test from './test.vue';

defineProps<{ msg: string }>();

var svgEl = ref<SVGSVGElement | null>(null);
var svgGEl = ref<SVGGElement | null>(null);
let testComponent = ref(null);
const config = ref({
    name: 'vue-lifecycle-json',
    blocks: {
        start: {
            label: 'block.app = Vue.createApp(options); app.mount(el)',
        },
        start2: {
            label: 'block.app = Vue.createApp(options); app.mount(el)',
        },
        start3: {
            label: 'block.app = Vue.createApp(options); app.mount(el)',
        },
        line: {
            from: "start",
            to: "start2",
            type: "line",
            label: "",
        },
        line2: {
            from: "start",
            to: "start3",
            type: "line",
            label: "",
        }
    },
    phases: [
        {
            newBlock: {
                init: 'init events & lifecycle',
                test: 'test blockp',
            },
            connect: [
                {
                    from: 'start',
                    to: 'init',
                },
                {
                    from: 'init',
                    to: 'start',
                },
            ],
        },
        {
            newBlock: {
                initInject: 'Init injections & reactivity',
            },
            connect: {
                from: 'init',
                to: 'initInject',
            },
        },
        {
            newBlock: {
                beforeCreate: 'beforeCreate',
            },
            connect: {
                from: 'init',
                to: 'beforeCreate',
                name: 'line_init_beforeCreate',
            },
            connect1: {
                from: 'init',
                to: 'beforeCreate',
                name: 'line_init_beforeCreate',
            },
            connect2: {
                from: 'init',
                to: 'beforeCreate',
                name: 'line_init_beforeCreate',
            },
            connect3: {
                from: 'init',
                to: 'beforeCreate',
                name: 'line_init_beforeCreate',
            },
        },
        {
            newBlock: {
                initInject: 'Init injections & reactivity',
            },
            connect: {
                from: 'init',
                to: 'initInject',
            },
        },
        {
            newBlock: {
                initInject: 'Init injections & reactivity',
            },
            connect: {
                from: 'init',
                to: 'initInject',
            },
        },
        {
            newBlock: {
                initInject: 'Init injections & reactivity',
            },
            connect: {
                from: 'init',
                to: 'initInject',
            },
        },
        {
            newBlock: {
                initInject: 'Init injections & reactivity',
            },
            connect: {
                from: 'init',
                to: 'initInject',
            },
        },
    ],
    style: {
        blocks: {
            _: {
                css: {
                    color: 'white',
                    fill: '#3ab881',
                    fontSize: '0.1em',
                },
            },
            start: {
                position: {
                    x: 10,
                    y: 10,
                    w: 100,
                    h: 60,
                },
                css: {
                    fill: '#3e6b94',
                },
                label: "start"
            },
            start2: {
                position: {
                    x: 100,
                    y: 100,
                    w: 100,
                    h: 60,
                },
                css: {
                    fill: '#9257fa',
                },
            },
            start3: {
                position: {
                    x: 300,
                    y: 100,
                    w: 100,
                    h: 60,
                },
                css: {
                    fill: '#9257fa',
                },
            },
            init: {
                position: {
                    x: 'start.x',
                    y: 'start.y + start.h + 20',
                    w: 'start.w',
                    h: 'start.h',
                },
            },
            initInject: {
                position: {
                    x: 'init.x',
                    y: 'init.y + start.h + 20',
                    w: 'init.w',
                    h: 'init.h',
                },
            },
            beforeCreate: {
                position: {
                    x: 'init.x - init.w - 40',
                    y: 'init.y + init.h',
                    w: 'init.w',
                    h: 'initInject.y - init.y - init.h',
                },
                css: {
                    fill: 'none',
                    color: 'red',
                    stroke: 'red',
                },
            },
            line_init_beforeCreate: {
                position: {
                    x1: 'line_1.x1',
                    y1: 'line_1.y1 + (line_1.y2 - line_1.y1) / 2',
                    y2: 'line_1.y1 + (line_1.y2 - line_1.y1) / 2',
                },
                css: {
                    fill: 'red',
                    stroke: 'red',
                    'stroke-dasharray': 3,
                },
            },
        },
    },
});
const architecture = ref({
    currentPhase: ref(null),
    toPhase: (index) => (architecture.value.currentPhase = index),
}) as any as Ref<Architecture>;
let editor = shallowRef();
const viewBox = reactive({
    x: 0,
    y: 0,
    w: 0,
    h: 0,
});
const editorComponent = computed(() => editor.value?.component);
onMounted(() => {
    editor.value = enableEditor({
        svg: svgEl,
        workEl: svgGEl,
        config,
        initialConfig: config,
        architecture,
        id: 'test',
    });
    testComponent.value = editor.value.wrap(test);
    const svgSize = svgEl.value.getBoundingClientRect();
    viewBox.w = svgSize.width;
    viewBox.h = svgSize.height;
});
const block = {
    id: 'start',
    label: "test"
};
const block2 = {
    id: 'start2',
    label: "test",
};
const block3 = {
    id: 'start3',
};
</script>

<template>
    <editorComponent v-if="!!editor">
        <template #preview="data">
            <foreignObject
                pointer-events="none"
                width="100%"
                height="100%"
                requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"
                ><div xmlns="http://www.w3.org/1999/xhtml">
                    <div class="bg-red-100" style="box-sizing: border-box; text-align: center">
                        <div>test</div>
                    </div>
                </div></foreignObject
            >
        </template>
    </editorComponent>
    <div class="h-full relative">
        <svg
            width="95%"
            height="700"
            :viewBox="`${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`"
            ref="svgEl"
            class="rounded-lg border-3 shadow-3 ml-10"
        >
            <defs>
                <marker
                    id="sequenceflow-end"
                    viewBox="0 0 20 20"
                    refX="11"
                    refY="10"
                    markerWidth="10"
                    markerHeight="10"
                    orient="auto"
                >
                    <path
                        d="M 1 5 L 11 10 L 1 15 Z"
                        style="
                            fill: black;
                            stroke-width: 1px;
                            stroke-linecap: round;
                            stroke-dasharray: 10000, 1;
                            stroke: black;
                        "
                    ></path>
                </marker>
            </defs>
            <g ref="svgGEl">
                <testComponent
                    v-if="testComponent"
                    :style="config.style.blocks.start.css"
                    :positioning="config.style.blocks.start.position"
                    :block="block"
                />
                <testComponent
                    v-if="testComponent"
                    :positioning="config.style.blocks.start2.position"
                    :style="config.style.blocks.start2.css"
                    :block="block2"
                />
                <testComponent
                    v-if="testComponent"
                    :positioning="config.style.blocks.start3.position"
                    :style="config.style.blocks.start3.css"
                    :block="block3"
                />
            </g>
        </svg>
    </div>
</template>

<style scoped>
a {
    color: #42b983;
}

label {
    margin: 0 0.5em;
    font-weight: bold;
}

code {
    background-color: #eee;
    padding: 2px 4px;
    border-radius: 4px;
    color: #304455;
}
</style>
