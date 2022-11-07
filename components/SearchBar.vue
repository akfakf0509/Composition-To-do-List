<script setup lang="ts">
export interface Emits {
    (e: "search", value: string): void;
}

const emit = defineEmits<Emits>();
const searchText = ref("");
</script>

<template>
    <form class="search-bar" @submit.prevent="$emit('search', searchText)">
        <TextInput v-model="searchText" class="search-bar__input" />
        <button class="search-bar__button">검색</button>
    </form>
</template>
