<script setup lang="ts">
import { Ref } from "vue";
import { Props as WorkCardProps } from "~/components/WorkCard.vue";

let key = ref(0);
const workList: Ref<WorkCardProps[]> = ref([]);

function updateIsDone(i: number, isDone: boolean) {
    workList.value.splice(i, 1, { ...workList.value[i], isDone });
}
function createWork(title: string, content: string) {
    workList.value.push({ content, id: key.value++, isDone: false, title });
}
</script>

<template>
    <div class="app">
        <CreateForm class="app__form" @create="createWork" />
        <ul class="app__list">
            <WorkCard
                v-for="(work, i) in workList"
                v-bind="work"
                @change="updateIsDone(i, $event)"
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
