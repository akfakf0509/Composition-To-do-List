<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useWorkStore } from "~~/stores/work";

const store = useWorkStore();
const { updateState, updateCustomIndexMap, removeWork } = store;
const { sort, sortedWorkList } = storeToRefs(store);

let startId: number;
const searchText = ref("");

const searchedWorkList = computed(() =>
    sortedWorkList.value.filter(
        (work) =>
            work.content.includes(searchText.value) ||
            work.title.includes(searchText.value)
    )
);

function search(text: string) {
    searchText.value = text;
}
function handleDragOver(e: DragEvent) {
    e.preventDefault();
}
function handleDragStart(id: number) {
    startId = id;
}
function handleDrop(id: number) {
    updateCustomIndexMap(startId, id);
}
</script>

<template>
    <div class="work-list">
        <SearchBar class="work-list__search" @search="search" />
        <SortSelect />
        <ul class="work-list__list">
            <WorkCard
                v-for="(work, i) in searchedWorkList"
                :key="work.id"
                v-bind="work"
                class="work-list__list__item"
                :draggable="sort === 'custom' ? 'true' : 'false'"
                @change="updateState(work.id, $event)"
                @delete="removeWork(work.id)"
                @dragover="handleDragOver($event)"
                @dragstart="handleDragStart(work.id)"
                @drop="handleDrop(work.id)"
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
