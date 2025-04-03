import { FormSection } from "./form-section.tsx/form-section";
import { FeaturedPosts } from "./FeaturedPosts";


export const InputForm = () => {
    return(
        <main className="max-w-6xl mx-auto px-4 py-12 space-y-16">
        {/* Create Post Section */}
          <FormSection/>
        {/* Preview Section */}

        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-center">Your Recent Creations</h2>
          <FeaturedPosts />
        </section>
      </main>
    )
}