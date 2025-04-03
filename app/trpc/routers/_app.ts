import { GetMyPostRouter } from '@/app/(Navbar)/create/Procedure';
import {createTRPCRouter } from '../init';
export const appRouter = createTRPCRouter({
  userPosts:GetMyPostRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;

