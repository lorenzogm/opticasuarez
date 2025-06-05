export function SocialMediaSection() {
  return (
    <section className="relative min-h-[525px]">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src="/api/placeholder/1200/525" 
          alt="Social media background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-blue-800/25"></div>
      </div>

      {/* Social Media Cards */}
      <div className="relative max-w-7xl mx-auto px-4 flex items-center justify-center min-h-[525px]">
        <div className="grid grid-cols-2 gap-8">
          {/* Instagram Card */}
          <div className="bg-white rounded-lg shadow-sm p-6 w-[355px] h-[189px] flex flex-col justify-between">
            <div className="flex items-center justify-center mb-4">
              <div className="text-blue-800 text-[29.4px]">
                📷
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-[25.2px] font-normal text-blue-800 leading-[1.2] mb-3" style={{ fontFamily: 'Delius, serif' }}>
                Estamos en Instagram
              </h3>
              <p className="text-blue-800 text-[16.8px] leading-[1.5]">
                @opticasuarezjaen
              </p>
            </div>
          </div>

          {/* Facebook Card */}
          <div className="bg-white rounded-lg shadow-sm p-6 w-[355px] h-[189px] flex flex-col justify-between">
            <div className="flex items-center justify-center mb-4">
              <div className="text-blue-800 text-[29.4px]">
                📘
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-[25.2px] font-normal text-blue-800 leading-[1.2] mb-3" style={{ fontFamily: 'Delius, serif' }}>
                Estamos en Facebook
              </h3>
              <p className="text-blue-800 text-[16.8px] leading-[1.5]">
                @opticasuarezjaen
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
