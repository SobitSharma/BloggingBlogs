import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Newsletter() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-gray-600 mb-8">
            Subscribe to our newsletter for the latest posts delivered to your inbox.
          </p>
          <div className="flex gap-4 max-w-md mx-auto">
            <Input placeholder="Enter your email" className="rounded-full px-6" />
            <Button className="rounded-full px-8">Subscribe</Button>
          </div>
        </div>
      </div>
    </section>
  );
}