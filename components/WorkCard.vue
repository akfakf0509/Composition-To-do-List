<script setup lang="ts">
export interface Props {
    title: string;
    isDone: boolean;
}
export interface Emits {
    (e: "change", isDone: boolean): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
const { isDone, title } = toRefs(props);

function emitChange() {
    emit("change", !isDone.value);
}
</script>

<template>
    <li class="work-card">
        <input type="checkbox" :checked="isDone" @change="emitChange" />
        <p class="work-card__title">{{ title }}</p>
        이것은 내용이여
    </li>
</template>

<style lang="scss" scoped>
.work-card {
    &__title {
        color: red;
    }
}
</style>
