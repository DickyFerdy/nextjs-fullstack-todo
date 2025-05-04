export type Todo = {
    _id: string;
    title: string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
};

export type TodoInput = {
    title: string;
};

export type TodoUpdateInput = {
    _id: string
    completed: boolean;
};
