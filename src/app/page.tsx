export default function Home() {
  return (
    <div className="homepage flex min-h-screen  ">
      <main>
        {/* Your content here */}
  <div className="fixed right-0 top-0 h-screen w-20 flex items-center justify-center z-50">
    <div style={{ transform: 'rotate(-90deg)', transformOrigin: 'center', fontFamily: 'Walker' }}>
      <nav className="flex gap-6 text-[1rem] min-[700px]:text-[1.5rem] tracking-[0.08em] font-semibold text-[#f4e9d2] whitespace-nowrap style={{ fontFamily: 'Walker' }}">
        <a href="/" className="hover:invert hover:underline transition-all duration-200 ">HOME</a>
        <a href="/gallery" className="hover:invert hover:underline transition-all duration-200 ">GALLERY</a>
        <a href="/packages" className="hover:invert hover:underline transition-all duration-200 ">PACKAGES</a>
      </nav>
    </div>
  </div>
        <div className="absolute top-0 left-0 px-4 py-4 min-[900px]:px-6 min-[900px]:py-6 flex flex-col min-[900px]:flex-row gap-0 min-[900px]:gap-4 pr-[80px] min-[900px]:pr-6">
          <div className="flex flex-col">
            <span className="text-[10rem] md:text-[14rem] lg:text-[17rem] xl:text-[22rem] 2xl:text-[26rem] tracking-wide leading-none text-[#f4e9d2]" style={{ fontFamily: 'Historic ' }}>
              BOROMA
            </span>
            <p className="text-[#f4e9d2] text-sm min-[700px]:text-base md:text-lg lg:text-xl max-w-md min-[900px]:max-w-xs xl:max-w-sm mt-4 hidden min-[900px]:block" style={{ fontFamily: 'Walker', textShadow: '2px 2px 6px rgba(0, 0, 0, 0.6)' }}>
              A studio focoused on building solutions and stories that contribute to the world we wish to live in
            </p>
          </div>
          <span className="text-[3rem] min-[700px]:text-[5rem] md:text-[7rem] lg:text-[8rem] xl:text-[10.5rem] 2xl:text-[13rem] font-bold tracking-tight leading-none text-[#f4e9d2]" style={{ fontFamily: 'Walker' }}>
            MANSA
          </span>
          <p className="text-[#f4e9d2] text-sm min-[700px]:text-base md:text-lg lg:text-xl max-w-md mt-4 min-[900px]:hidden" style={{ fontFamily: 'Walker', textShadow: '2px 2px 6px rgba(0, 0, 0, 0.6)' }}>
            A studio focoused on building solutions and stories that contribute to the world we wish to live in
          </p>
        </div>



      </main>
    </div>
  );
}
