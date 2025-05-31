import { Todo } from "@/types/todo";
import { Button } from "../ui/button";
import { Check, RotateCcw, X } from "lucide-react";
import { Separator } from "../ui/separator";

interface TodoItemProps {
    todo: Todo;
    onToggle: (_id: string) => void;
    onDelete: (_id: string) => void;
};

export default function TodoItem({
    todo, onToggle, onDelete
}: TodoItemProps) {
    return (
        <>
            <span
                className={`flex-grow text-sm ${
                    todo.completed
                        ? "text-gray-500 line-through"
                        : "text-yellow-500"
                }`}
                role="button"
                tabIndex={0}
                onClick={() => onToggle(todo._id)}
                onKeyDown={(e) => e.key === "Enter" && onToggle(todo._id)}
            >
                {todo.title}
            </span>
            <div className="flex items-center bg-[#111111] rounded-md border border-[#222222]">
                <Button
                    onClick={() => onToggle(todo._id)}
                    size="sm"
                    variant="ghost"
                    className="h-10 px-3 text-gray-400 hover:text-gray-200 hover:bg-[#222222] rounded-none"
                    aria-label={`${todo.completed ? "Revert" : "Complete"} "${
                        todo.title
                    }"`}
                >
                    {todo.completed ? (
                        <RotateCcw size={14} />
                    ) : (
                        <Check size={14} />
                    )}
                </Button>
                <Separator
                    orientation="vertical"
                    className="h-5 bg-[#222222]"
                />
                <Button
                    onClick={() => onDelete(todo._id)}
                    size="sm"
                    variant="ghost"
                    className="h-10 px-3 text-gray-400 hover:text-gray-200 hover:bg-[#222222] rounded-none"
                    aria-label={`Remove "${todo.title}" from the list`}
                >
                    <X size={14} />
                </Button>
            </div>
        </>
    );
}
