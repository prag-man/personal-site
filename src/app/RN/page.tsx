import Image from 'next/image'

const RN = () => {
  return (
        <div className="h-screen bg-white ">
        {/* Header Section */}
        <header className="max-w-4xl mx-auto px-6 py-16 md:pt-16 md:pb-5">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">
              updates
            </h1>
            <p className="text-lg md:text-xl text-muted leading-relaxed max-w-4xl">
              A collection of updates on my life, thoughts, and projects.
            </p>
          </div>
        </header>
        <div className="relative h-[50%] w-[90%] md:h-[65%] md:w-4xl rounded-2xl mx-auto">
          <Image src="/processing.png" alt="thoughts" fill className="object-cover absolute rounded-2xl" />
        </div>
      </div>
    );
}

export default RN