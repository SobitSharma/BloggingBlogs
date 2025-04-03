import { InputForm } from "@/app/components/InputForm";
import { HydrateClient, trpc } from "@/app/trpc/server";

export const dynamic = "force-dynamic";

export default async function CreatePostPage() {

  void trpc.userPosts.getMany.prefetch();

  return (
    <div className="min-h-screen">
      <HydrateClient>
        <InputForm/>
      </HydrateClient>
    </div>
  );
}