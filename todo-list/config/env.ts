import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const {
    NODE_ENV,
    DB_URI
}: { NODE_ENV?: string; DB_URI?: string } = process.env;