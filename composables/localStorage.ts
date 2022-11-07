import Work from "~~/types/Work";

const ITEM_NAME = "workList";

export const storageSave = (workList: Work[]) => {
    let convertedStr = "";
    workList.forEach((work, index) => {
        convertedStr += JSON.stringify(work);
        if (index + 1 < workList.length) convertedStr += "&";
    });
    localStorage.setItem(ITEM_NAME, convertedStr);
};

export const storageLoad = (): Work[] => {
    const data = localStorage.getItem(ITEM_NAME);
    if (!data) return [];
    const workList: Work[] = [];
    data.split("&").forEach((data) => {
        const work: Work = JSON.parse(data);
        workList.push(createWork(work.content, work.isDone, work.title));
    });
    return workList;
};
export const storageClear = () => {
    localStorage.removeItem(ITEM_NAME);
};
