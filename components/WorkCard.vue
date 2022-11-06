<script setup lang="ts">
export interface Props {
    content: string;
    id: number;
    isDone: boolean;
    title: string;
}
export interface Emits {
    (e: "change", isDone: boolean): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
const { content, id, isDone, title } = toRefs(props);

const titleClasses = computed(() => {
    return [
        "work-card__header__title",
        { "work-card__header__title--done": isDone.value },
    ];
});

function emitChange() {
    emit("change", !isDone.value);
}
</script>

<template>
    <li class="work-card">
        <p class="work-card__header">
            <input
                :id="`checkbox-${id}`"
                class="work-card__header__checkbox"
                type="checkbox"
                :checked="isDone"
                @change="emitChange"
            />
            <label :for="`checkbox-${id}`" :class="titleClasses">
                {{ title }}
            </label>
        </p>
        <p class="work-card__content">{{ content }}</p>
    </li>
</template>

<style lang="scss" scoped>
.work-card {
    padding: 12px;
    border: 1px solid gray;
    border-radius: 8px;

    &__header {
        &__title {
            font-size: 1.2rem;

            &--done {
                text-decoration: line-through;
            }
        }
    }
    &__content {
        margin-top: 4px;
        color: dimgray;
    }
}
</style>
