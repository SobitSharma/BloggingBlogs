"use client"
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { UploadModal } from "@/app/components/UploadModal.tsx/upload-modal";
import { trpc } from "@/app/trpc/client";
import { toast } from "sonner";

interface InputFormProps {
    type?: "Update" | "Create";
    Title?: string;
    Description?: string;
}

export const FormSection = ({
    type="Create",
    Title,
    Description,
}: InputFormProps) => {
    const [title, setTitle] = useState(Title || "")
    const [content, setContent] = useState(Description || "");
    const utils = trpc.useUtils()
    const onUploadComplete = () => {
        if(type==="Create"){
            setTitle("")
            setContent("")
        }
        console.log("On Upload complete I am prninted")
        utils.userPosts.getMany.invalidate();
        toast.success("Post Created")
      }

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
                            defaultValue={content}
                            placeholder="Pour your thoughts here... (Markdown supported)"
                            className="min-h-[300px] text-lg rounded-xl"
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>

                    {/* Image Upload */}

                    <UploadModal type={type} title={title} content={content} onUploadComplete={onUploadComplete}/>
                    {/* Actions */}

                </div>
            </Card>
        </section>
    )
}