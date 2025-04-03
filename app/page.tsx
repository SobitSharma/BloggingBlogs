import Hero from "./components/Hero";
import Newsletter from "./components/Newsletter";
import { FeaturedPostHome } from "./featured-post-home";
import { trpc } from "./trpc/server";

export const dynamic = "force-dynamic";

export default function Home() {
  void trpc.userPosts.getFewPosts.prefetch();
  return (
    <div className="min-h-screen">
      <main>
        <Hero />
        <FeaturedPostHome />
      </main>
    </div>
  );
}