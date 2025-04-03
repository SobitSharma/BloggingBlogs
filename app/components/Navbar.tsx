"use client"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";


export default function Navbar() {
  const { user } = useUser();
  const pathname = usePathname();


  return (
    <nav className="sticky top-0 bg-white/90 backdrop-blur-sm border-b z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-gray-900">
          BlogSphere
        </Link>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex gap-6">
            <Link href="/"
              className={pathname === '/' ? "text-black font-extrabold" : "text-gray-600 hover:text-gray-900"}>
              Home
            </Link>
            <Link
              href={user ? "/create" : "/sign-in"}
              className={pathname === '/create' ? "text-black font-extrabold" : "text-gray-600 hover:text-gray-900"}>
              Create
            </Link>
            <Link href="/about"
              className={pathname === '/about' ? "text-black font-extrabold" : "text-gray-600 hover:text-gray-900"}>
              About
            </Link>
            <UserButton/>
          </div>
          {
            !user && (
              <Button variant="outline" asChild>
                <Link href="/sign-in">Sign In</Link>
              </Button>
            )
          }
        </div>
      </div>
    </nav>
  );
}