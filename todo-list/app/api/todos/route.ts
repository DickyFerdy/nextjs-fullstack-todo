import { createTodo, getTodos } from "@/libs/api/handlers/todo.handler";
import connectToDatabase from "@/libs/database/mongodb";
import { NextResponse } from "next/server";
import type { ApiResponse } from "@/types/api";
import type { Todo, TodoInput } from "@/types/todo";
import { errorResponse } from "@/libs/utils/apiResponse";

export async function GET(): Promise<NextResponse<ApiResponse<Todo[]>>> {
    try {
        await connectToDatabase();
        const data = await getTodos();

        return NextResponse.json({
            success: true,
            data
        }, { status: 200 });

    } catch (error: unknown) {
        if (error instanceof Error) {
            return errorResponse(error.message);
        }

        return errorResponse("Unknown error occured");
    }
};

export async function POST(request: Request): Promise<NextResponse<ApiResponse<Todo>>> {
    try {
        await connectToDatabase();

        const body = await request.json();
        const { title } = body as TodoInput;

        if (typeof title !== "string") {
            return errorResponse("Title is required", 400);
        }

        if (title.trim().length === 0) {
            return errorResponse("Title must be at least 1 character long", 400);
        }

        const newTodo = await createTodo({ title });
        return NextResponse.json({
            success: true,
            data: newTodo
        }, { status: 201 });

    } catch (error) {
        if (error instanceof Error) {
            return errorResponse(error.message);
        }

        return errorResponse("Unknown error occured");
    }
};
