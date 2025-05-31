"use client";

import { motion, AnimatePresence } from "framer-motion";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import { useTodos } from "@/hooks/useTodos";

const snappyTransition = {
    type: "spring",
    stiffness: 500,
    damping: 30,
    mass: 1,
};

export default function Todo() {
    const {
        todos,
        inputValue,
        setInputValue,
        addTodo,
        toggleTodo,
        removeTodo,
        isSubmitting,
        isLoading,
        bottomRef
    } = useTodos();

    return (
        <motion.div
            className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 dynamic-island-todo"
            initial={false}
            transition={{
                ...snappyTransition,
                borderRadius: { duration: 0.08 },
            }}
        >
            <motion.div
                className="bg-black text-white h-full cursor-pointer overflow-hidden rounded-[inherit] border border-gray-800"
                layout
                transition={snappyTransition}
            >
                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{
                            ...snappyTransition,
                            opacity: { duration: 0.1 },
                        }}
                        className="p-4 pb-2"
                    >
                        <TodoInput inputValue={inputValue} onChange={setInputValue} onSubmit={addTodo} isSubmitting={isSubmitting} />
                        <motion.ul
                            className="space-y-2 max-h-60 overflow-y-auto"
                            role="list"
                            aria-label="Todo list"
                            layout
                        >
                            {isLoading ? (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="text-gray-500 text-sm text-center pt-4"
                                >
                                    Loading todos...
                                </motion.p>
                            ) : todos.length === 0 ? (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="text-gray-500 text-sm text-center pt-4"
                                >
                                    You have nothing to do~
                                </motion.p>
                            ) : (
                                <TodoList todos={todos} onToggle={toggleTodo} onDelete={removeTodo} />
                            )}
                            <div ref={bottomRef} />
                        </motion.ul>
                    </motion.div>
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
}
