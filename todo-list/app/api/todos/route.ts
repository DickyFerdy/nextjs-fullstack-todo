import { getTodos } from "@/libs/api/handlers/todo.handler";
import connectToDatabase from "@/libs/database/mongodb";
import { NextResponse } from "next/server";
import type { ApiResponse } from "@/types/api";
import type { Todo } from "@/types/todo";

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
            return NextResponse.json({
                success: false,
                message: error.message || "Internal server error"
            }, { status: 500 });
        }

        return NextResponse.json({
            success: false,
            message: "Unknown error occured"
        }, { status: 500 });
    }
};
