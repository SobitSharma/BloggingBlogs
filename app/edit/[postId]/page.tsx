import { HydrateClient, trpc } from "@/app/trpc/server";
import { PostEditor } from "../post-editor";

export const dynamic = "force-dynamic"

interface PageProps{
    params:Promise<{
        postId:string;
    }>
}
export default async function Page({params}:PageProps){
    const {postId} = await params;
    void trpc.userPosts.getOne.prefetch({postId});
    return(
        <HydrateClient>
            <PostEditor postId={postId}/>
        </HydrateClient>
    )
}