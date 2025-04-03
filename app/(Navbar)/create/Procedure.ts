import { baseProcedure, createTRPCRouter, protectedProcedure } from "@/app/trpc/init";
import { db } from "@/db/drizzle";
import { Posts, users } from "@/db/schema";
import { TRPCError } from "@trpc/server";
import { and, eq, getTableColumns } from "drizzle-orm";
import { UTApi } from "uploadthing/server";
import { z } from "zod"
import { desc } from "drizzle-orm";

export const GetMyPostRouter = createTRPCRouter({
    getMany: protectedProcedure.
        input(z.void()).
        query(async ({ ctx }) => {
            const { clerkUserId } = ctx;
            console.log("Here The procdure is called")
            if (!clerkUserId) {
                throw new TRPCError({ code: "UNAUTHORIZED" });
            }

            const [user] = await db.select().from(users).where(eq(users.clerkId, clerkUserId));
            if (!user) {
                throw new TRPCError({ code: "NOT_FOUND" });
            }

            const posts = await
                db.select({
                    ...getTableColumns(Posts),
                    user: users
                }).
                    from(Posts)
                    .where(
                        eq(Posts.userId, user.id)
                    )
                    .innerJoin(users, eq(Posts.userId, users.id))


            return { posts }
        }),
    remove:protectedProcedure
    .input(z.object({postId:z.string().uuid()}))
    .mutation(async({input})=>{
        const {postId} = input;
        const utapi = new UTApi();
        const [deletedPost] = await db.delete(Posts).where(eq(Posts.id, postId)).returning();
        if(!deletedPost){
            throw new TRPCError({code:"NOT_FOUND"})
        }
        const deletedImageFile = await utapi.deleteFiles(deletedPost.postKey);
        if(!deletedImageFile.success){
            throw new TRPCError({code :'INTERNAL_SERVER_ERROR'})
        }
        return deletedPost
    }),

    getOne:baseProcedure
    .input(z.object({postId:z.string().nonempty()}))
    .query(async({input})=> {
        const {postId} = input;
       

        if(!postId){
            throw new TRPCError({code:'NOT_FOUND'})
        }
        const [singlePost] = await 
        db.select({
            ...getTableColumns(Posts),
            user:users
        })
        .from(Posts).where(eq(Posts.id, postId))
        .innerJoin(users, eq(Posts.userId, users.id));

        return singlePost;
    }),

    getManyPublicPost:baseProcedure
    .query(async()=> {
        const allPost = await db.select(
            {
                ...getTableColumns(Posts),
                user:users
            }
        ).from(Posts).innerJoin(users, eq(Posts.userId, users.id))
        .orderBy(desc(Posts.createdAt));

        return allPost;
    }),

    getFewPosts:baseProcedure
    .query(async()=>{
        const allPost = await db.select(
            {
                ...getTableColumns(Posts),
                user:users
            }
        ).from(Posts).innerJoin(users, eq(Posts.userId, users.id))
        .orderBy(desc(Posts.createdAt)).limit(3)

        return allPost;
    }),

    update:protectedProcedure
    .input(z.object({postId:z.string().nonempty(),
        title:z.string().nonempty(),
        description:z.string().nonempty()
    }))
    .mutation(async({ctx, input})=> {
        const {postId, title, description} = input;
        const {clerkUserId} = ctx;

        if(!clerkUserId){
            throw new TRPCError({code:"UNAUTHORIZED"})
        }

        const [checkuser] = await db.select().from(users).where(
            eq(
            users.clerkId, clerkUserId
        ));

        const [updatedPost] = await db.update(Posts).set({
            title,
            description
        }).where(and(
            eq(Posts.id, postId),
            eq(Posts.userId, checkuser.id)
        )).returning();

        if(!updatedPost){
            throw new TRPCError({code:'NOT_FOUND'})
        }

        return updatedPost;
    })
})