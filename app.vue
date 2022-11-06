<script setup lang="ts">
import { Ref } from "vue";
import { Props as WorkCardProps } from "~/components/WorkCard.vue";

const workList: Ref<WorkCardProps[]> = ref([]);

workList.value.push({ isDone: true, title: "1" });
workList.value.push({ isDone: false, title: "2" });
workList.value.push({ isDone: false, title: "3" });
workList.value.push({ isDone: true, title: "4" });
workList.value.push({ isDone: false, title: "5" });

function handleChange(i: number, isDone: boolean) {
    workList.value.splice(i, 1, { ...workList.value[i], isDone });
}
</script>

<template>
    <ul>
        <WorkCard
            v-for="(work, i) in workList"
            v-bind="work"
            @change="handleChange(i, $event)"
        />
    </ul>
</template>
