import { createTRPCRouter, publicProcedure , protectedProcedure } from "../trpc";

export const projectRouter = createTRPCRouter({
  createProject: protectedProcedure.input().mutation(async({ctx,input}) =>{
    ctx.user.userId
    console.log("hi")
    return true
  })
})