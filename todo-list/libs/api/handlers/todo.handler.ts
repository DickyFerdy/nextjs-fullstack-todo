import Todo from "@/libs/database/models/todo.model";

export const getTodos = async () => {
    return await Todo.find();
};
