<script setup lang="ts">
import { useWorkStore } from "./stores/work";

const store = useWorkStore();
const { workList, pushWork } = store;

store.$onAction(({ after }) => {
    after(() => {
        storageSaveWorkList(workList);
    });
});

onMounted(() => {
    store.$patch((state) => {
        state.workList.splice(0, 0, ...storageLoadWorkList());
        let largest = 0;
        state.workList.forEach((work) => {
            if (work.id > largest) largest = work.id;
        });
        state.idIndex = largest + 1;
    });
});
</script>

<template>
    <div class="app">
        <CreateForm
            class="app__form"
            @create="(title, content) => pushWork(content, 'todo', title)"
        />
        <WorkList />
    </div>
</template>

<style lang="scss" scoped>
.app {
    padding: 8px;

    &__form {
        padding-bottom: 8px;
        margin-bottom: 16px;
        border-bottom: 1px solid gray;
    }
}
</style>
