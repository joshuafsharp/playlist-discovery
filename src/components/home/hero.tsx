export const Hero = () => {
  return (
    <section className="relative bg-black pt-12 sm:pt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-normal uppercase tracking-widest">
            <span className="bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
              Take control of your listening
            </span>
          </p>

          <h1 className="mt-8 text-4xl font-normal text-white sm:text-5xl lg:text-6xl xl:text-7xl">
            Discover & manage your playlists with ease
          </h1>

          <div className="mt-12 flex flex-col items-center justify-center space-y-5 px-8 sm:flex-row sm:space-y-0 sm:space-x-5 sm:px-0">
            <div className="group relative inline-flex w-full items-center justify-center sm:w-auto">
              <div className="absolute -inset-px rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-200 group-hover:shadow-lg group-hover:shadow-cyan-500/50"></div>
              <a
                href="#"
                title=""
                className="relative inline-flex w-full items-center justify-center rounded-full border border-transparent bg-black px-8 py-3 text-base font-normal text-white sm:w-auto"
                role="button"
              >
                Start 14 Days Free Trial
              </a>
            </div>

            <a
              href="#"
              title=""
              className="inline-flex w-full items-center justify-center rounded-full border border-gray-600 bg-black px-8 py-3 text-base font-normal text-white transition-all duration-200 hover:border-white sm:w-auto"
              role="button"
            >
              Talk to Sales
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
