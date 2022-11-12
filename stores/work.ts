import { defineStore } from "pinia";
import { State, Work } from "~~/types/work";

export const useWorkStore = defineStore("work", () => {
    const idIndex = ref(0);
    const workList = ref<Work[]>([]);
    const sort = ref<Sort>("created");
    const customIndexMap = ref<Record<number, number>>({});

    const sortedWorkList = computed(() => {
        if (sort.value === "custom")
            return workList.value.sort((firstWork, lastWork) =>
                sortByCustom(firstWork, lastWork, customIndexMap.value)
            );
        return workList.value.sort(sortMap[sort.value]);
    });

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

    return {
        idIndex,
        workList,
        sort,
        customIndexMap,
        sortedWorkList,
        updateIsDone,
        pushWork,
        removeWork,
    };
});

type Sort = "alphabetical" | "created" | "custom" | "done";

const sortMap: Record<Sort, (firstWork: Work, lastWork: Work) => number> = {
    alphabetical: sortByAlphabetical,
    created: sortByCreate,
    custom: sortByCustom,
    done: sortByDone,
};

function sortByAlphabetical(firstWork: Work, lastWork: Work) {
    if (firstWork.title > lastWork.title) return 1;
    if (firstWork.title < lastWork.title) return -1;
    return 0;
}
function sortByCreate(firstWork: Work, lastWork: Work) {
    if (firstWork.createdDate > lastWork.createdDate) return -1;
    if (firstWork.createdDate < lastWork.createdDate) return 1;
    return 0;
}
function sortByCustom(
    firstWork: Work,
    lastWork: Work,
    customIndexMap?: Record<number, number>
) {
    if (!customIndexMap) return 0;
    if (customIndexMap[firstWork.id] > customIndexMap[lastWork.id]) return 1;
    if (customIndexMap[firstWork.id] < customIndexMap[lastWork.id]) return -1;
    return 0;
}
function sortByDone(firstWork: Work, lastWork: Work) {
    if (!firstWork.doneDate || !lastWork.doneDate) return 0;
    if (firstWork.doneDate > lastWork.doneDate) return 1;
    if (firstWork.doneDate < lastWork.doneDate) return -1;
    return 0;
}
