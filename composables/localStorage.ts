import { Work } from "./work";

const ITEM_NAME = "workList";

export const save = (workList: Work[]) => {
    let convertedStr = "";
    workList.forEach((work, index) => {
        convertedStr += JSON.stringify(work);
        if (index + 1 < workList.length) convertedStr += "&";
    });
    localStorage.setItem(ITEM_NAME, convertedStr);
};

export const load = (): Work[] => {
    const data = localStorage.getItem(ITEM_NAME);
    if (!data) return [];
    const workList: Work[] = [];
    data.split("&").forEach((data) => {
        const work: Work = JSON.parse(data);
        workList.push(createWork(work.content, work.isDone, work.title));
    });
    return workList;
};
export const clear = () => {
    localStorage.removeItem(ITEM_NAME);
};
