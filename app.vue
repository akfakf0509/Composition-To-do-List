<script setup lang="ts">
import { Ref } from "vue";
import { Props as WorkCardProps } from "~/components/WorkCard.vue";

const workList: Ref<WorkCardProps[]> = ref([]);

workList.value.push({
    content: "This is content",
    id: 1,
    isDone: true,
    title: "1",
});
workList.value.push({
    content: "This is content",
    id: 2,
    isDone: false,
    title: "2",
});
workList.value.push({
    content: "This is content",
    id: 3,
    isDone: false,
    title: "3",
});
workList.value.push({
    content: "This is content",
    id: 4,
    isDone: true,
    title: "4",
});
workList.value.push({
    content: "This is content",
    id: 5,
    isDone: false,
    title: "5",
});

function handleChange(i: number, isDone: boolean) {
    workList.value.splice(i, 1, { ...workList.value[i], isDone });
}
</script>

<template>
    <ul class="list">
        <WorkCard
            v-for="(work, i) in workList"
            v-bind="work"
            @change="handleChange(i, $event)"
        />
    </ul>
</template>

<style lang="scss" scoped>
.list {
    display: grid;
    gap: 8px;
    padding: 8px;
}
</style>
