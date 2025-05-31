export async function getTodos(controller: AbortController) {
    const res = await fetch("/api/todos", {
        signal: controller.signal
    });
    if (!res.ok) throw await res.json();
    return (await res.json()).data;
}

export async function createTodo(title: string) {
    const res = await fetch("/api/todos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
    });
    if (!res.ok) throw await res.json();
    return (await res.json()).data;
};

export async function updateTodo(_id: string, completed: boolean) {
    return await fetch("/api/todos", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id, completed })
    });
};

export async function deleteTodo(_id: string) {
    return await fetch("/api/todos", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ _id })
    });
};
