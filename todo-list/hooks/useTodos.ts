import { useState, useEffect, useRef } from "react";
import { Todo } from "@/types/todo";
import { createTodo, deleteTodo, getTodos, updateTodo } from "@/libs/api";

export function useTodos() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isAddingTodo, setIsAddingTodo] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    const addTodo = async () => {
        if (isSubmitting) return;
        const title = inputValue.trim();
        if (!title) return;

        setIsSubmitting(true);
        try {
            const todo = await createTodo(title);
            setIsAddingTodo(true);
            setTodos((prev) => [
                ...prev,
                {
                    _id: todo._id,
                    title: todo.title,
                    completed: todo.completed,
                },
            ]);
            setInputValue("");
        } catch (error) {
            alert("Gagal menambahkan todo");
        } finally {
            setIsSubmitting(false);
        }
    };

    const toggleTodo = async (_id: string) => {
        const todo = todos.find((todo) => todo._id === _id);
        if (!todo) return;

        try {
            await updateTodo(_id, !todo.completed);
            setTodos((prev) =>
                prev.map((todo) =>
                    todo._id === _id
                        ? { ...todo, completed: !todo.completed }
                        : todo
                )
            );
        } catch (error) {
            alert("Gagal mengupdate todo");
        }
    };

    const removeTodo = async (_id: string) => {
        try {
            await deleteTodo(_id);
            setTodos((prev) => prev.filter((todo) => todo._id !== _id));
        } catch (error) {
            alert("Gagal menghapus todo");
        }
    };

    const sortedTodos = [...todos].sort((a, b) => {
        if (a.completed === b.completed) return 0;
        return a.completed ? 1 : -1;
    });

    useEffect(() => {
        const controller = new AbortController();

        const fetchTodos = async () => {
            try {
                const todos = await getTodos(controller);
                setTodos(todos);
            } catch (error) {
                if (error instanceof Error && error.name !== "AbortError") {
                    console.error("Fetch Error: ", error);
                    alert("Gagal mengambil data todo");
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchTodos();
        inputRef.current?.focus();

        return () => controller.abort();
    }, []);

    useEffect(() => {
        if (isAddingTodo && todos.length > 0) {
            const timeout = setTimeout(() => {
                bottomRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "end",
                });
                setIsAddingTodo(false);
            }, 300);

            return () => clearTimeout(timeout);
        }
    }, [todos]);

    return {
        todos: sortedTodos,
        inputValue,
        setInputValue,
        addTodo,
        toggleTodo,
        removeTodo,
        isSubmitting,
        isLoading,
        bottomRef
    }
}
