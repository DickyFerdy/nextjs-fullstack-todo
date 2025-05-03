import { NextResponse } from 'next/server';

export const errorResponse = (message: string, status = 500) => {
    return NextResponse.json({
        success: false,
        message: message || "Internal server error"
    }, { status });
};
