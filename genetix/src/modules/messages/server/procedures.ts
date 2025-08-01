import { prisma } from "@/lib/db";
import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { inngest } from "@/inngest/client";
export const messagesRouter = createTRPCRouter({
    getMany: baseProcedure
        .query(async ()=>{
            const messages= await prisma.message.findMany({
                orderBy: {
                    updatedAt: "asc",
                },
            });
            return messages;
        }),
    create:baseProcedure
        .input(
            z.object({
                value:z.string()
                    .min(1, { message: "Message is required"})
                    .max(10000,{ message: "Message is too long"}),
                projectId: z.string().min(1, { message: "Project ID is required" }),
            }),
        )
        .mutation(async ({ input })=> {
            const createdMessage=await prisma.message.create({
                data: {
                    projectId: input.projectId,
                    content:input.value,
                    role: "USER",
                    type: "RESULT",
                },
            });
            await inngest.send({
                name: "code-agent/run",
                data: {
                    value: input.value,
                    projectId: input.projectId,
                },
                });
                return createdMessage;
        }),
});