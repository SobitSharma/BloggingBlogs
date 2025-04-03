import { Card } from "@/components/ui/card";
export default function AboutPage() {
  return (
    <div className="min-h-screen space-y-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-center py-16">
        <h1 className="text-4xl font-bold">Amplify Your Voice</h1>
        <p className="text-lg text-gray-200 mt-4 max-w-2xl mx-auto">
          At BlogSphere, every perspective sparks change, inspires innovation, and connects minds.
        </p>
      </section>

      {/* Mission Section */}
      <section className="max-w-5xl mx-auto px-4">
        <Card className="p-6 bg-gray-50 shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why We Exist 🌍</h2>
          <p className="text-gray-600 mb-4">
            We curate a space for <span className="text-purple-600 font-medium">meaningful dialogue</span>, empowering thinkers and creators to:
          </p>
          <ul className="space-y-2 text-gray-600">
            <li>✔️ Share authentic experiences</li>
            <li>✔️ Connect with like-minded communities</li>
            <li>✔️ Spark intellectual curiosity</li>
          </ul>
        </Card>
      </section>

      {/* Values Section */}
      <section className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold mb-8">Our Core Principles</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: "✨", title: "Authenticity First", text: "Raw, unfiltered perspectives over polished content." },
            { icon: "🌱", title: "Continuous Growth", text: "Every interaction brings new understanding." },
            { icon: "🤝", title: "Community Driven", text: "We listen, adapt, and evolve together." },
          ].map(({ icon, title, text }) => (
            <Card key={title} className="p-6 shadow-md">
              <div className="text-3xl">{icon}</div>
              <h3 className="text-xl font-semibold mt-3">{title}</h3>
              <p className="text-gray-600 mt-2">{text}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
