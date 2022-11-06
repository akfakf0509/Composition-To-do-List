<script setup lang="ts">
import { Work } from "./composables/work";

let workList = ref<Work[]>([]);

watch(
    workList,
    (value) => {
        save(value);
    },
    { deep: true }
);

onBeforeMount(() => {
    const loadedData = load();
    if (loadedData) workList.value = loadedData;
});

function updateIsDone(i: number, isDone: boolean) {
    workList.value.splice(i, 1, { ...workList.value[i], isDone });
}
function pushWork(title: string, content: string) {
    workList.value.push(createWork(content, false, title));
}
function removeWork(i: number) {
    workList.value.splice(i, 1);
}
</script>

<template>
    <div class="app">
        <CreateForm class="app__form" @create="pushWork" />
        <ul class="app__list">
            <WorkCard
                v-for="(work, i) in workList"
                v-bind="work"
                @change="updateIsDone(i, $event)"
                @delete="removeWork(i)"
            />
        </ul>
    </div>
</template>

<style lang="scss" scoped>
.app {
    padding: 8px;

    &__form {
        padding-bottom: 8px;
        margin-bottom: 16px;
        border-bottom: 1px solid gray;
    }

    &__list {
        display: grid;
        gap: 8px;
    }
}
</style>
