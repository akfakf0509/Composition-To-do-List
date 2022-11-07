<script setup lang="ts">
import { useWorkStore } from "~~/stores/work";
import { Work } from "~~/types/work";

const store = useWorkStore();
const { workList, updateIsDone, removeWork } = store;

const searchedWorkList = ref<Work[]>(workList);
const searchText = ref("");

function search(text: string) {
    if (!text) searchedWorkList.value = workList;
    searchedWorkList.value = workList.filter((work) => {
        return work.content.includes(text) || work.title.includes(text);
    });
}
</script>

<template>
    <div class="work-list">
        <SearchBar
            v-model="searchText"
            class="work-list__search"
            @search="search"
        />
        <draggable tag="ul" class="work-list__list">
            <WorkCard
                v-for="(work, i) in searchedWorkList"
                v-bind="work"
                class="work-list__list__item"
                @change="updateIsDone(i, $event)"
                @delete="removeWork(i)"
            />
        </draggable>
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
