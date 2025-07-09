"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function PersonalIntroSection() {
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 600)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="min-h-[90vh] flex flex-col-reverse lg:flex-row">
      {/* Left Side - White Background */}
      <div 
        className="lg:w-1/2 bg-white flex items-center justify-center px-8 md:py-16 lg:px-16"
        style={{ fontFamily: 'JetBrains Mono, monospace' }}
      >
        <div className="max-w-lg">
          <h1 className="text-4xl lg:text-5xl font-bold text-[#1E293B] mb-4">
            pragyam soni 
          </h1>
          <h3 className='text-xl text-[#1E293B]/60 font-semibold'>(aka pragman)</h3>
          <div className="space-y-6 text-[#1E293B] leading-relaxed mt-5">
            <p className="text-lg">
              hi, i'm pragman, 19 and clueless. i pretend to be coding all the time but in reality i just click 'tab' a 1000 times in a day. just kidding, i'm a self-taught dev, building stuff on the net and expanding the horizons of my brains
            </p>
            <p className="text-lg">
              i am a total addict towards these things - chess, dreaming, diet coke, overthinking (ofc), failing, procastination and the list goes on.
            </p>
            <p className="text-lg">
              
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - White Background with Dark Blue ASCII */}
      <div 
        className="lg:w-1/2 bg-white flex items-center justify-center px-8 py-16"
        style={{ fontFamily: 'JetBrains Mono, monospace' }}
      >
        <div className="text-center">
          <Image src="/ascii_art_blue.png" alt="ASCII Art" width={500} height={500} />
          
          <div className="text-[#1E293B]/80 text-sm space-y-2">
            <div className="flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span>Currently online & shipping</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}