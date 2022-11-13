import { Sort } from "~~/types/sort";
import { Work } from "~~/types/work";

const WORK_LIST_KEY = "workList";
const SORT_KEY = "sort";
const CUSTOM_INDEX_MAP_KEY = "customIndexMap";

export const storageSaveWorkList = (workList: Work[]) => {
    let convertedStr = "";
    workList.forEach((work, index) => {
        convertedStr += JSON.stringify(work);
        if (index + 1 < workList.length) convertedStr += "&";
    });
    localStorage.setItem(WORK_LIST_KEY, convertedStr);
};
export const storageSaveSort = (sort: Sort) => {
    localStorage.setItem(SORT_KEY, sort);
};
export const storageSaveCustomIndexMap = (
    customIndexMap: Record<number, number>
) => {
    localStorage.setItem(CUSTOM_INDEX_MAP_KEY, JSON.stringify(customIndexMap));
};

export const storageLoadWorkList = (): Work[] => {
    const data = localStorage.getItem(WORK_LIST_KEY);
    if (!data) return [];
    const workList: Work[] = [];
    data.split("&").forEach((data) => {
        const work: Work = JSON.parse(data);
        work.createdDate = new Date(work.createdDate);
        if (work.doneDate) work.doneDate = new Date(work.doneDate);
        workList.push(work);
    });
    return workList;
};
export const storageLoadSort = (): Sort => {
    const data = localStorage.getItem(SORT_KEY);
    if (!data) return "created";
    return data as Sort;
};
export const storageLoadCustomIndexMap = (): Record<number, number> => {
    const data = localStorage.getItem(CUSTOM_INDEX_MAP_KEY);
    if (!data) return {};
    return JSON.parse(data);
};

export const storageClearWorkList = () => {
    localStorage.removeItem(WORK_LIST_KEY);
};
export const storageClearSort = () => {
    localStorage.removeItem(SORT_KEY);
};
