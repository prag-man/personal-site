import { getPublishedPosts } from "@/lib/notion";
import Link from "next/link";
import Image from "next/image";

export default async function ThoughtsPage() {

    const posts = await getPublishedPosts();
  
    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };

    if (posts.length === 0) {
        return (
          <div className="h-screen bg-white ">
          {/* Header Section */}
          <header className="max-w-4xl mx-auto px-6 py-16 md:pt-16 md:pb-5">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">
                notes
              </h1>
              <p className="text-lg md:text-xl text-muted leading-relaxed max-w-4xl">
                A collection of musings on technology, systems thinking, and the craft of programming. 
                Thoughts that didn't fit in a tweet but aren't quite essays.
              </p>
            </div>
          </header>
          <div className="relative h-[50%] w-[90%] md:h-[65%] md:w-4xl rounded-2xl mx-auto">
            <Image src="/processing.png" alt="thoughts" fill className="object-cover absolute rounded-2xl" />
          </div>
        </div>
        );
    }
  
    return (
      <div className="min-h-screen bg-white ">
        {/* Header Section */}
        <header className="max-w-4xl mx-auto px-6 py-16 md:pt-24 md:pb-12">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">
              notes
            </h1>
            <p className="text-lg md:text-xl text-muted leading-relaxed max-w-2xl">
              A collection of musings on technology, systems thinking, and the craft of programming. 
              Thoughts that didn't fit in a tweet but aren't quite essays.
            </p>
          </div>
        </header>
  
        {/* Thoughts Grid */}
        <main className="max-w-4xl mx-auto px-6 pb-16">
          <div className="flex flex-col gap-8">
            {posts.map((thought) => (
             <Link href={`/notes/${thought.slug}`} key={thought.id}>
              <article
                key={thought.id}
                className="group border border-border rounded-lg p-6 md:p-8 hover:border-primary/20 transition-all duration-200 hover:shadow-sm"
              >
                <div className="space-y-4">
                  <div className="space-y-3">
                    <h2 className="text-xl md:text-2xl font-semibold text-primary group-hover:text-primary/80 transition-colors duration-200">
                      {thought.title}
                    </h2>
                    <p className="text-foreground leading-relaxed text-sm md:text-base">
                      {thought.excerpt}
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 pt-2">
                    <div className="flex items-center gap-4 text-sm text-muted">
                      <time dateTime={thought.date}>
                        {formatDate(thought.date)}
                      </time>
                      <span className="hidden sm:inline text-muted/50">•</span>
                      <span>{thought.readingTime}</span>
                    </div>
                    <button className="text-sm text-primary hover:text-primary/80 transition-colors duration-200 self-start sm:self-auto group-hover:underline">
                      Read more →
                    </button>
                  </div>
                </div>
              </article>
              </Link>
            ))}
          </div>
  
          {/* Footer Note */}
          <div className="mt-16 pt-8 border-t border-border">
            <p className="text-muted text-sm text-center">
              More thoughts coming soon. In the meantime, feel free to reach out with your own musings.
            </p>
          </div>
        </main>
      </div>
    );
  }