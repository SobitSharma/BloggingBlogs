"use client"
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Suspense, useState } from "react";
import { trpc } from "@/app/trpc/client";
import { ErrorBoundary } from "react-error-boundary";
import { FullPostSkeleton } from "../components/FullPostpage";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface InputFormProps {
    postId:string;
}

export const PostEditor = ({postId}:InputFormProps) => {
    return (
        <Suspense fallback={<FullPostSkeleton/>}>
            <ErrorBoundary fallback={<p>..Error Ocuured</p>}>
                <PostEditorSuspense postId={postId}/>
            </ErrorBoundary>
        </Suspense>
    )
}

export const PostEditorSuspense = ({
    postId
}: InputFormProps) => {
    const [data] = trpc.userPosts.getOne.useSuspenseQuery({postId})
    const [Title, setTitle] = useState(data.title);
    const [Description, setDescription] = useState(data.description)
    const utils = trpc.useUtils();
    const update = trpc.userPosts.update.useMutation({
        onSuccess:()=> {
            toast.success("Post Updated SuccessFully")
            utils.userPosts.invalidate();
        },
        onError:()=>{
            toast.error("Something went wrong")
        }
    });

    return (
        <section className="space-y-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
                    Craft Your Masterpiece
                </h1>
                <p className="text-gray-600 mt-4">Share your ideas with the world</p>
            </div>

            <Card className="p-8 shadow-lg border-none">
                <div className="space-y-8">
                    {/* Title Input */}
                    <div className="space-y-2">
                        <label className="text-lg font-medium">Post Title</label>
                        <Input
                            defaultValue={Title}
                            placeholder="Catchy title that sparks curiosity..."
                            className="text-lg py-6 rounded-xl"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    {/* Description Input */}
                    <div className="space-y-2">
                        <label className="text-lg font-medium">Your Story</label>
                        <Textarea
                            defaultValue={Description}
                            placeholder="Pour your thoughts here... (Markdown supported)"
                            className="min-h-[300px] text-lg rounded-xl"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div>
                        <Button 
                        onClick={()=>update.mutate({title:Title, description:Description, postId})}
                         className="bg-black text-white font-semibold rounded-2xl"
                         disabled={update.isPending}
                         >
                        
                            Save</Button>
                    </div>
                </div>
            </Card>
        </section>
    )
}