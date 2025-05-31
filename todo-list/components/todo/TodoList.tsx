import { Todo } from "@/types/todo";
import { motion, AnimatePresence } from "framer-motion";
import TodoItem from "./TodoItem";

interface TodoListProps {
    todos: Todo[];
    onToggle: (_id: string) => void;
    onDelete: (_id: string) => void;
}

export default function TodoList({
  todos, onToggle, onDelete
}: TodoListProps) {
    return (
        <AnimatePresence initial={false}>
            {todos.map((todo, _) => (
                <motion.li
                    key={todo._id}
                    initial={{
                        opacity: 0,
                        height: 0,
                    }}
                    animate={{
                        opacity: 1,
                        height: "auto",
                    }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                        mass: 1,
                    }}
                    className="flex items-center justify-between"
                    role="listitem"
                    layout
                >
                    <TodoItem
                        todo={todo}
                        onToggle={onToggle}
                        onDelete={onDelete}
                    />
                </motion.li>
            ))}
        </AnimatePresence>
    );
}
