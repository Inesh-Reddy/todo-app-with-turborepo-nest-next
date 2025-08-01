"use client";
import { createTRPCReact } from "@trpc/react-query";
import { AppRouter } from "@repo/trpc/client";

export const trpc = createTRPCReact<AppRouter>();
