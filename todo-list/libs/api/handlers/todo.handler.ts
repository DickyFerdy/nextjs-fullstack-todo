import Todo from "@/libs/database/models/todo.model";
import type { Todo as TodoType, TodoInput, TodoUpdateInput } from "@/types/todo";

export const getTodos = async (): Promise<TodoType[]> => {
    const todos = await Todo.find().lean<TodoType[]>();
    return todos;
};

export const createTodo = async (todo: TodoInput): Promise<TodoType> => {
    const newTodo = await Todo.create(todo);
    return newTodo.toObject() as TodoType;
};

export const updateTodo = async ({ _id, completed }: TodoUpdateInput): Promise<TodoType | null> => {
    const updatedTodo = await Todo.findByIdAndUpdate(
        _id,
        { completed },
        { new: true }
    );

    return !updatedTodo ? null : updatedTodo.toObject() as TodoType;
};

export const deleteTodo = async (_id: string): Promise<boolean> => {
    const deleteTodo = await Todo.findByIdAndDelete(_id);
    return deleteTodo !== null;
};
