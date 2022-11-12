<script setup lang="ts">
import { useWorkStore } from "~~/stores/work";
import { Work } from "~~/types/work";

const store = useWorkStore();
const { sortedWorkList, updateIsDone, removeWork } = store;

const searchedWorkList = ref<Work[]>(sortedWorkList);
const searchText = ref("");

let startIndex: number;

function search(text: string) {
    if (!text) searchedWorkList.value = sortedWorkList;
    searchedWorkList.value = sortedWorkList.filter((work) => {
        return work.content.includes(text) || work.title.includes(text);
    });
}
function handleDragOver(e: DragEvent) {
    e.preventDefault();
}
function handleDragStart(i: number) {
    startIndex = i;
}
function handleDrop(i: number) {
    const target = searchedWorkList.value[startIndex];
    searchedWorkList.value.splice(startIndex, 1);
    searchedWorkList.value.splice(i, 0, target);
}
</script>

<template>
    <div class="work-list">
        <SearchBar
            v-model="searchText"
            class="work-list__search"
            @search="search"
        />
        <SortSelect />
        <ul class="work-list__list">
            <WorkCard
                v-for="(work, i) in searchedWorkList"
                v-bind="work"
                class="work-list__list__item"
                draggable="true"
                @change="updateIsDone(i, $event)"
                @delete="removeWork(i)"
                @dragover="handleDragOver($event)"
                @dragstart="handleDragStart(i)"
                @drop="handleDrop(i)"
            />
        </ul>
    </div>
</template>

<style lang="scss" scoped>
.work-list {
    &__search {
        margin-bottom: 8px;
    }
    &__list {
        display: grid;
        gap: 8px;
    }
}
</style>
