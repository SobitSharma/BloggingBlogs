import { FullPostPage } from "@/app/components/FullPostpage";
import { HydrateClient, trpc } from "@/app/trpc/server";

interface PageProps{
    params:Promise<{
        postId:string;
    }>
}

const Page = async({params}:PageProps) => {
    const {postId} = await params;
    void trpc.userPosts.getOne.prefetch({postId});
    return(
        <HydrateClient>
            <FullPostPage postId={postId}/>
        </HydrateClient>
    )
}


export default Page;