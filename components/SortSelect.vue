<script setup lang="ts">
import { Sort } from "~~/types/sort";
import { useWorkStore } from "~~/stores/work";
import { storeToRefs } from "pinia";

const store = useWorkStore();
const { updateSort } = store;
const { sort } = storeToRefs(store);

function handleChange(e: Event) {
    const select = e.target as HTMLInputElement;
    updateSort(select.value as Sort);
}
</script>

<template>
    {{ sort }}
    <select :value="sort" @change="handleChange">
        <option value="alphabetical">이름 순</option>
        <option value="created">생성 순</option>
        <option value="custom">커스텀</option>
        <option value="done">완료 순</option>
    </select>
</template>
