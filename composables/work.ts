let idIndex = 0;

export interface Work {
    content: string;
    id: number;
    isDone: boolean;
    title: string;
}

export const createWork = (
    content: Work["content"] = "",
    isDone: Work["isDone"] = false,
    title: Work["title"] = ""
): Work => {
    return {
        content,
        id: idIndex++,
        isDone,
        title,
    };
};
