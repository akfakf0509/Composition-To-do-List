import { defineStore } from "pinia";
import { Sort } from "~~/types/sort";
import { State, Work } from "~~/types/work";

export const useWorkStore = defineStore("work", () => {
    const idIndex = ref(0);
    const workList = ref<Work[]>([]);
    const sort = ref<Sort>("created");
    const customIndexMap = ref<Record<number, number>>({});

    const sortedWorkList = computed<Work[]>(() => {
        const copyWorkList = Array.from(workList.value);
        if (sort.value === "custom")
            return copyWorkList.sort((firstWork, lastWork) =>
                sortByCustom(firstWork, lastWork, customIndexMap.value)
            );
        return copyWorkList.sort(sortMap[sort.value]);
    });

    function updateState(id: number, state: State) {
        const index = workList.value.findIndex((work) => work.id === id);
        let doneDate = state === "done" ? new Date() : undefined;
        workList.value.splice(index, 1, {
            ...workList.value[index],
            state,
            doneDate,
        });
    }
    function updateSort(newSort: Sort) {
        if (newSort === "custom") resetCustomIndexMap();
        sort.value = newSort;
    }
    function updateCustomIndexMap(id: number, targetId: number) {
        const targetIndex = customIndexMap.value[targetId];
        customIndexMap.value[targetId] = customIndexMap.value[id];
        customIndexMap.value[id] = targetIndex;
    }
    function pushWork(
        content: Work["content"] = "",
        state: Work["state"] = "todo",
        title: Work["title"] = ""
    ) {
        const newWork: Work = {
            id: idIndex.value++,
            title,
            content,
            createdDate: new Date(),
            state,
        };
        workList.value.push(newWork);
        if (sort.value === "custom") pushCustomIndexMap(newWork);
    }
    function removeWork(id: number) {
        const index = workList.value.findIndex((work) => work.id === id);
        const removedWork = workList.value.splice(index, 1);
        if (sort.value === "custom") removeCustomIndexMap(removedWork[0]);
    }

    function pushCustomIndexMap(work: Work) {
        customIndexMap.value[work.id] = workList.value.length - 1;
    }
    function removeCustomIndexMap(work: Work) {
        delete customIndexMap.value[work.id];
    }
    function resetCustomIndexMap() {
        workList.value.forEach(
            (work, i) => (customIndexMap.value[work.id] = i)
        );
    }

    return {
        idIndex,
        workList,
        sort,
        customIndexMap,
        sortedWorkList,
        updateState,
        updateSort,
        updateCustomIndexMap,
        pushWork,
        removeWork,
    };
});

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
    if (!firstWork.doneDate) return 1;
    if (!lastWork.doneDate) return -1;
    if (firstWork.doneDate > lastWork.doneDate) return -1;
    if (firstWork.doneDate < lastWork.doneDate) return 1;
    return 0;
}
