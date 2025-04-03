"use client"
import { Card } from "@/components/ui/card";
import { trpc } from "./trpc/client";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary"
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { format } from "date-fns";
import { toast } from "sonner";
import { useAuth } from "@clerk/nextjs";



export const FeaturedPostHome = () => {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <Suspense fallback={<LoadingSkeleton />}>
          <ErrorBoundary fallback={<ErrorFallback />}>
            <FeaturedPostsSuspense />
          </ErrorBoundary>
        </Suspense>
      </div>
    </section>
  )
}

function LoadingSkeleton() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(3)].map((_, i) => (
        <Card key={i} className="p-6 h-64 animate-pulse">
          <div className="space-y-3">
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </Card>
      ))}
    </div>
  )
}

function ErrorFallback() {
  return (
    <div className="text-center py-12 bg-red-50 rounded-lg">
      <p className="text-red-600">Failed to load posts. Please try refreshing the page.</p>
    </div>
  )
}

function FeaturedPostsSuspense() {
  const [data] = trpc.userPosts.getFewPosts.useSuspenseQuery();
  return (
    <>
      <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
        Featured Posts
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </>
  )
}

interface PostCardProps {
  post: {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
    user: {
      name: string;
      clerkImageUrl: string;
    };
  };
}

function PostCard({ post }: PostCardProps) {
    const {userId} = useAuth() 
  return (
      <Link href={userId ? `/post/${post.id}` : `/sign-in`} className="group">
        <Card className="p-6 hover:shadow-lg transition-shadow h-full flex flex-col">
          <div className="flex-grow">
            <div>
              <h3 className="text-xl font-semibold mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors">
                {post.title}
              </h3>
            </div>
            <p className="text-gray-600 mb-4 line-clamp-3 text-sm">
              {post.description}
            </p>
          </div>

          <div className="mt-4 border-t pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  {format(new Date(post.createdAt), "MMM dd, yyyy")}
                </p>
                <p className="text-sm font-medium text-gray-700">
                  {post.user.name}
                </p>
              </div>
              <Avatar className="border-2 border-purple-100">
                <AvatarImage src={post.user.clerkImageUrl} />
                <AvatarFallback>
                  {post.user.name[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </Card>
      </Link>
  )
}