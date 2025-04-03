import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth, currentUser } from "@clerk/nextjs/server";
import {UploadThingError} from "uploadthing/server"
import {z} from "zod"
import { db } from "@/db/drizzle";
import { Posts, users } from "@/db/schema";
import { eq } from "drizzle-orm";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  }).
  input(z.object({
    title:z.string().min(10),
    content:z.string().min(30)
  }))
    .middleware(async ({ input }) => {
      const {userId:clerkUserId} = await auth();
      if(!clerkUserId){
        throw new UploadThingError("UNAUTHORIZED")
      }

      const [user] = await db.select().from(users).where(eq(users.clerkId, clerkUserId));

      if(!user){
        throw new UploadThingError("User Not Found")
      }
      
      return {userId:user.id, ...input}
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const {title, content, userId} = metadata;
      await db.insert(Posts).values({
        userId:userId,
        title,
        description:content,
        postUrl:file.ufsUrl,
        postKey:file.key

      })
      return { uploadedBy: metadata.userId};
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
