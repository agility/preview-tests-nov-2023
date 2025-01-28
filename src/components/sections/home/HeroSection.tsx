export default function HeroSection() {
  return (
    <section
      className="relative text-white py-20"
      style={{
        backgroundImage: "url('/images/hero-bg.jpg')",
        height: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center">
        <div className="relative text-center">
          <h1 className="text-5xl font-bold mb-4">Localhost Safaris</h1>
          <h1 className="text-2xl font-bold mb-4">
            Welcomes you to the Kenyan Coastline
          </h1>
          <p className="text-xl mb-6">
            Discover the beauty of the Kenyan Coastline
          </p>
          <button className="px-6 py-3 bg-blue-500 rounded-lg hover:bg-blue-700 transition">
            Explore Now
          </button>
        </div>
      </div>
    </section>
  );
}
