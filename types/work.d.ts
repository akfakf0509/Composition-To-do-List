export declare type State = "todo" | "doing" | "done";

export declare interface Work {
    id: number;
    title: string;
    content: string;
    createdDate: Date;
    doneDate?: Date;
    state: State;
}
