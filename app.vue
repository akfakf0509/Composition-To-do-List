<script setup lang="ts">
import { Ref } from "vue";
import { Props as WorkCardProps } from "~/components/WorkCard.vue";

const workList: Ref<WorkCardProps[]> = ref([]);

workList.value.push({ id: 1, isDone: true, title: "1" });
workList.value.push({ id: 2, isDone: false, title: "2" });
workList.value.push({ id: 3, isDone: false, title: "3" });
workList.value.push({ id: 4, isDone: true, title: "4" });
workList.value.push({ id: 5, isDone: false, title: "5" });

function handleChange(id, isDone) {
    console.log(id, isDone);
}
</script>

<template>
    <ul>
        <WorkCard
            v-for="work in workList"
            v-bind="work"
            @change="handleChange"
        />
    </ul>
    {{ workList }}
</template>
