import { HydrateClient, trpc } from '@/app/trpc/server'
import React from 'react'
import { AllPostView } from '../AllPostView';

export const dynamic = "force-dynamic"

const page = () => {
    void trpc.userPosts.getManyPublicPost.prefetch();

  return (
    <HydrateClient>
        <AllPostView/>
    </HydrateClient>
  )
}

export default page