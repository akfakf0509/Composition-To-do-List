import { defineStore } from "pinia";
import { State, Work } from "~~/types/work";

export const useWorkStore = defineStore("work", () => {
    const idIndex = ref(0);
    const workList = ref<Work[]>([]);

    function updateIsDone(index: number, state: State) {
        let doneDate = state === "done" ? new Date() : undefined;
        workList.value.splice(index, 1, {
            ...workList.value[index],
            state,
            doneDate,
        });
    }
    function pushWork(
        content: Work["content"] = "",
        state: Work["state"] = "todo",
        title: Work["title"] = ""
    ) {
        workList.value.push({
            id: idIndex.value++,
            title,
            content,
            createdDate: new Date(),
            state,
        });
    }
    function removeWork(index: number) {
        workList.value.splice(index, 1);
    }

    return { idIndex, workList, updateIsDone, pushWork, removeWork };
});
