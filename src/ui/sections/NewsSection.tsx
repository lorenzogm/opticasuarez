export function NewsSection() {
  return (
    <section className="relative h-[290px]">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src="/api/placeholder/1200/290" 
          alt="News background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/47"></div>
      </div>

      {/* Content */}
      <div className="relative flex items-center justify-end h-full max-w-7xl mx-auto px-4">
        <div className="text-right mr-8">
          <h2 className="text-white text-[36.8px] font-normal leading-[1.25] mb-6" style={{ fontFamily: 'Delius, serif' }}>
            NOTICIAS
          </h2>
          <button className="bg-transparent border border-blue-800 text-white px-6 py-2 rounded text-[16.8px] leading-[1.5] hover:bg-blue-800 transition-colors">
            INFORMACIÓN
          </button>
        </div>
      </div>
    </section>
  )
}
