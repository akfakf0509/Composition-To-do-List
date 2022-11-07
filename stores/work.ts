import { defineStore } from "pinia";
import { Work } from "~~/types/work";

export const useWorkStore = defineStore("work", () => {
    const idIndex = ref(0);
    const workList = ref<Work[]>([]);

    function updateIsDone(index: number, isDone: boolean) {
        workList.value.splice(index, 1, { ...workList.value[index], isDone });
    }
    function pushWork(
        content: Work["content"] = "",
        isDone: Work["isDone"] = false,
        title: Work["title"] = ""
    ) {
        workList.value.push({
            content,
            id: idIndex.value++,
            isDone,
            title,
        });
    }
    function removeWork(index: number) {
        workList.value.splice(index, 1);
    }

    return { idIndex, workList, updateIsDone, pushWork, removeWork };
});
