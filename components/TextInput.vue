<script setup lang="ts">
export interface Props {
    modelValue: string;
}
export interface Emits {
    (e: "update:modelValue", value: string): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
const { modelValue } = toRefs(props);

const childModel = computed({
    get: () => modelValue.value,
    set: (value: string) => emit("update:modelValue", value),
});

function updateChildModel(e: InputEvent) {
    const input = e.target as HTMLInputElement;
    childModel.value = input.value;
}
</script>

<template>
    <input
        type="text"
        :value="childModel"
        @input="updateChildModel($event as InputEvent)"
    />
</template>

<style lang="scss" scoped></style>
