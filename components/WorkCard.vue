<script setup lang="ts">
export interface Props {
    content: string;
    createdDate: Date;
    doneDate?: Date;
    id: number;
    isDone: boolean;
    title: string;
}
export interface Emits {
    (e: "change", isDone: boolean): void;
    (e: "delete"): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
const { content, createdDate, doneDate, id, isDone, title } = toRefs(props);

const showDoneDate = computed(() => {
    return !!doneDate?.value;
});
const titleClasses = computed(() => {
    return [
        "work-card__header__title",
        { "work-card__header__title--done": isDone.value },
    ];
});
const formattedCreatedDate = computed(() => {
    return Intl.DateTimeFormat("ko", {
        dateStyle: "long",
        timeStyle: "short",
    }).format(createdDate.value);
});
const formattedDoneDate = computed(() => {
    if (!doneDate?.value) return "";
    return Intl.DateTimeFormat("ko", {
        dateStyle: "long",
        timeStyle: "short",
    }).format(doneDate.value);
});

function emitChange() {
    emit("change", !isDone.value);
}
function emitDelete() {
    if (confirm("정말 삭제할까요?")) emit("delete");
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
                @change="emitChange()"
            />
            <label :for="`checkbox-${id}`" :class="titleClasses">
                {{ title }}
            </label>
        </p>
        <p class="work-card__content">{{ content }}</p>
        <p class="work-card__desc">
            <span class="work-card__desc__item">
                생성됨: {{ formattedCreatedDate }}
            </span>
            <template v-if="showDoneDate">
                /
                <span class="work-card__desc__item">
                    완료됨: {{ formattedDoneDate }}
                </span>
            </template>
        </p>
        <button class="work-card__delete" @click="emitDelete()">삭제</button>
    </li>
</template>

<style lang="scss" scoped>
.work-card {
    position: relative;
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
    &__desc {
        margin-top: 16px;
        color: darkgray;
        font-size: 0.8rem;
    }
    &__delete {
        position: absolute;
        top: 12px;
        right: 12px;
    }
}
</style>
