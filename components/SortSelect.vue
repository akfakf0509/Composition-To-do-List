<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useWorkStore } from "~~/stores/work";

const store = useWorkStore();
const { updateSort } = store;
const { sort } = storeToRefs(store);

const modelSort = computed({
    get: () => sort.value,
    set: (value) => {
        updateSort(value);
    },
});
</script>

<template>
    <select v-model="modelSort">
        <option value="alphabetical">이름 순</option>
        <option value="created">생성 순</option>
        <option value="custom">커스텀</option>
        <option value="done">완료 순</option>
    </select>
</template>
