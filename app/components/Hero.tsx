import Link from "next/link";
import { auth } from "@clerk/nextjs/server";

export default async function Hero() {
  const {userId} = await auth()
  return (
    <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold mb-6 leading-tight">
          Discover Insights That Matter
        </h1>
        <p className="text-xl text-gray-200 mb-8">
          Explore thought-provoking articles on technology, design, and innovation.
        </p>
        <Link className="rounded-full px-8 bg-black p-2" href={userId ? "/post/allpost" : "/sign-in"}>
          Start Reading
        </Link>
      </div>
    </section>
  );
}