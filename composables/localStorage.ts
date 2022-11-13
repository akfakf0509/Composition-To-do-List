import { Work } from "~~/types/work";

const ITEM_NAME = "workList";

export const storageSaveWorkList = (workList: Work[]) => {
    let convertedStr = "";
    workList.forEach((work, index) => {
        convertedStr += JSON.stringify(work);
        if (index + 1 < workList.length) convertedStr += "&";
    });
    localStorage.setItem(ITEM_NAME, convertedStr);
};

export const storageLoadWorkList = (): Work[] => {
    const data = localStorage.getItem(ITEM_NAME);
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
export const storageClearWorkList = () => {
    localStorage.removeItem(ITEM_NAME);
};
