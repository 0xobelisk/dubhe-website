"use client"

export default function HeroBackground() {
  return (
    <div className="absolute inset-0">
      <div className="w-full h-full bg-gradient-to-r from-slate-900/20 via-purple-800/30 to-blue-900/20">
        {/* Background Video */}
        <video 
          className="absolute inset-0 w-full h-full object-cover opacity-15"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="https://cdn.prod.website-files.com/6425f546844727ce5fb9e5ab/65689c2b73f0ce51c2dd59c0_Var7-transcode.mp4" type="video/mp4" />
        </video>
        
        {/* Enhanced background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-blue-700/20 to-purple-800/30"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/40 to-blue-500/50 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-to-br from-blue-600/40 to-purple-600/50 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-br from-pink-500/30 to-purple-500/40 rounded-full blur-3xl"></div>
        
        {/* Starfield effect */}
        <div className="absolute inset-0">
          {Array.from({ length: 100 }).map((_, i) => (
            <div
              key={`star-${i}`}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.8 + 0.2,
                animation: `twinkle ${2 + Math.random() * 3}s infinite ${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}