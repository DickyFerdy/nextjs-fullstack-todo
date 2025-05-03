import Todo from "@/libs/database/models/todo.model";
import type { Todo as TodoType, TodoInput } from "@/types/todo";

export const getTodos = async (): Promise<TodoType[]> => {
    const todos = await Todo.find().lean<TodoType[]>();
    return todos;
};

export const createTodo = async (todo: TodoInput): Promise<TodoType> => {
    const newTodo = await Todo.create(todo);
    return newTodo.toObject() as TodoType;
};
