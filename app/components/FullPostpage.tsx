"use client"

import { trpc } from "../trpc/client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Share, ArrowLeft } from "lucide-react";
import { APP_URL } from "../constant";
import { Suspense, useState } from "react";
import { useAuth, useClerk } from "@clerk/nextjs";
import { ErrorBoundary } from "react-error-boundary";
import { Skeleton } from "@/components/ui/skeleton";

interface fullPostPage {
    postId: string;
}

export const FullPostPage = ({postId}:fullPostPage) => {
    const clerk = useClerk()
    const {userId} = useAuth();
    if(!userId){
        clerk.openSignIn()
    }
    return(
        <Suspense fallback={<FullPostSkeleton/>}>
            <ErrorBoundary fallback={<p>...Error</p>}>
                <FullPostPageSuspense postId={postId}/>
            </ErrorBoundary>
        </Suspense>
    )
}


export const FullPostSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Navigation Skeleton */}
        <div className="mb-8">
          <Skeleton className="h-10 w-32 rounded-lg" />
        </div>

        {/* Post Container Skeleton */}
        <article className="bg-white rounded-2xl shadow-sm border border-gray-200/50 overflow-hidden">
          {/* Header Skeleton */}
          <header className="px-6 sm:px-8 pt-8">
            <Skeleton className="h-10 w-full mb-6 rounded-lg" />
            <Skeleton className="h-8 w-3/4 mb-6 rounded-lg" />
            
            {/* Author Info Skeleton */}
            <div className="flex items-center gap-4 mb-6">
              <Skeleton className="w-12 h-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>

            {/* Featured Image Skeleton */}
            <Skeleton className="aspect-video w-full rounded-xl mb-8" />
          </header>

          {/* Content Skeleton */}
          <div className="px-6 sm:px-8 pb-8 space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-10/12" />
            <Skeleton className="h-4 w-9/12" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          {/* Share Button Skeleton */}
          <div className="px-6 sm:px-8 pb-6">
            <Skeleton className="h-10 w-32 ml-auto rounded-md" />
          </div>
        </article>

        {/* Author Bio Skeleton */}
        <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-200/50 overflow-hidden">
          <div className="px-6 sm:px-8 py-6">
            <Skeleton className="h-6 w-48 mb-4 rounded-lg" />
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <Skeleton className="w-16 h-16 sm:w-20 sm:h-20 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const FullPostPageSuspense = ({ postId }: fullPostPage) => {
    const [post] = trpc.userPosts.getOne.useSuspenseQuery({ postId });
    const [copied, setCopied] = useState(false);
    

    const onCopy = () => {
        setCopied(true)
        const url = `${APP_URL}/post/${postId}`;
        navigator.clipboard.writeText(url)
        setTimeout(() => {
            setCopied(false)
        }, 3000)
    }

    // Function to format the description with proper HTML structure
    const formatDescription = (text: string) => {
        if (!text) return null;
        
        // Split by double newlines to create paragraphs
        const paragraphs = text.split(/\n\s*\n/);
        
        return paragraphs.map((paragraph, index) => (
            <p key={index} className="mb-4 last:mb-0 leading-relaxed">
                {paragraph.split('\n').map((line, i, arr) => (
                    <span key={i}>
                        {line}
                        {i !== arr.length - 1 && <br />}
                    </span>
                ))}
            </p>
        ));
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                {/* Navigation */}
                <div className="mb-8">
                    <Button asChild variant="ghost" className="px-3 py-2 hover:bg-gray-100/50 transition-colors">
                        <Link href="/post/allpost" className="flex items-center gap-2 text-gray-700 hover:text-gray-900">
                            <ArrowLeft className="w-5 h-5" />
                            <span className="text-lg font-medium">All Posts</span>
                        </Link>
                    </Button>
                </div>

                {/* Post Container */}
                <article className="bg-white rounded-2xl shadow-sm border border-gray-200/50 overflow-hidden">
                    {/* Header */}
                    <header className="px-6 sm:px-8 pt-8">
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
                            {post.title}
                        </h1>

                        {/* Author Info */}
                        <div className="flex items-center gap-4 mb-6">
                            <Avatar className="w-12 h-12 border-2 border-white shadow-md">
                                <AvatarImage src={post.user.clerkImageUrl} />
                                <AvatarFallback className="bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700">
                                    {post.user.name[0]}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-medium text-gray-900">{post.user.name}</p>
                                <time className="text-sm text-gray-500">
                                    {new Date(post.updated_at).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </time>
                            </div>
                        </div>

                        {/* Featured Image */}
                        {post.postUrl && (
                            <div className="relative aspect-video rounded-xl overflow-hidden mb-8 bg-gradient-to-br from-gray-100 to-gray-200">
                                <Image
                                    src={post.postUrl}
                                    alt={post.title}
                                    fill
                                    className="object-cover"
                                    priority
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                                />
                            </div>
                        )}
                    </header>

                    {/* Content */}
                    <div className="px-6 sm:px-8 pb-8">
                        <div className="text-gray-700 text-base sm:text-lg leading-relaxed tracking-normal whitespace-pre-wrap break-words">
                            {formatDescription(post.description)}
                        </div>
                    </div>

                    {/* Share Button */}
                    <Separator className="my-4 bg-gray-100" />
                    <div className="px-6 sm:px-8 pb-6">
                        <div className="flex justify-end">
                            <Button 
                                variant="outline" 
                                className="gap-2 border-gray-200 hover:bg-gray-50/50 transition-colors shadow-sm"
                                onClick={onCopy}
                            >
                                {
                                    copied ? (
                                        <span className="text-green-600 font-medium">Copied to clipboard!</span>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <Share className="w-4 h-4" />
                                            <span>Share Post</span>
                                        </div>
                                    )
                                }
                            </Button>
                        </div>
                    </div>
                </article>

                {/* Author Bio */}
                <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-200/50 overflow-hidden">
                    <div className="px-6 sm:px-8 py-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">About the Author</h3>
                        <div className="flex flex-col sm:flex-row items-start gap-6">
                            <Avatar className="w-16 h-16 sm:w-20 sm:h-20 border-2 border-white shadow-md">
                                <AvatarImage src={post.user.clerkImageUrl} />
                                <AvatarFallback className="bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700">
                                    {post.user.name[0]}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <h4 className="text-lg font-medium text-gray-900 mb-2">{post.user.name}</h4>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}