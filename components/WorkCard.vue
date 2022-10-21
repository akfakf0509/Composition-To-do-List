<script setup>
const props = defineProps({
    title: {
        default: "",
        required: false,
        type: String,
    },
});
</script>

<template>
    <li class="work-card">
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
