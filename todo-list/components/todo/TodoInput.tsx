"use client";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader, Pencil, Plus } from "lucide-react";
import React, { useRef } from "react";

interface TodoInputProps {
    inputValue: string;
    onChange: (value: string) => void;
    onSubmit: () => void;
    isSubmitting?: boolean;
};

export default function TodoInput({
    inputValue,
    onChange,
    onSubmit,
    isSubmitting,
}: TodoInputProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleKey = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") onSubmit();
    };

    return (
        <div className="flex mb-4 items-center">
            <div className="flex-grow relative mr-2">
                <Input
                    type="text"
                    value={inputValue}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyUp={handleKey}
                    placeholder="Add a new todo"
                    className="w-full bg-[#111111] border-[#222222] text-gray-200 placeholder:text-gray-500 focus:border-[#333333] focus:outline-none focus:ring-0 focus:ring-offset-0 h-10 pl-10 transition-colors duration-200 rounded-lg"
                    ref={inputRef}
                    aria-label="New todo input"
                />
                <Pencil className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            </div>
            <Button
                onClick={onSubmit}
                className="bg-[#111111] hover:bg-[#222222] text-gray-400 hover:text-gray-200 transition-colors h-10 px-3 border border-[#222222] rounded-lg"
                disabled={isSubmitting}
            >
                {isSubmitting ? <Loader size={16} /> : <Plus size={16} />}
            </Button>
        </div>
    );
}
