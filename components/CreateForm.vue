<script lang="ts" setup>
export interface Emits {
    (e: "create", title: string, content: string): void;
}

const emit = defineEmits<Emits>();

const title = ref("");
const content = ref("");

function handleSubmit() {
    emitCreate();
    reset();
}
function reset() {
    title.value = "";
    content.value = "";
}
function emitCreate() {
    emit("create", title.value, content.value);
}
</script>

<template>
    <form class="create-form" @submit.prevent="handleSubmit()">
        <label class="create-form__item">
            <p class="create-form__item__text">제목</p>
            <input v-model="title" class="create-form__item__input" required />
        </label>
        <label class="create-form__item">
            <p class="create-form__item__text">내용</p>
            <input
                v-model="content"
                class="create-form__item__input"
                required
            />
        </label>
        <button class="create-form__button" type="submit">생성하기</button>
    </form>
</template>

<style lang="scss" scoped>
.create-form {
    &__item {
        display: flex;
        flex-direction: column;
        margin-bottom: 8px;

        &__text {
            margin-bottom: 4px;
        }
    }
}
</style>
