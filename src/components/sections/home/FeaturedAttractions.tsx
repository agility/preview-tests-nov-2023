"use client";
import { useEffect, useState } from "react";
import { getDominantColor } from "../../../../utils/color"; // Update path if needed

export default function FeaturedAttractions() {
  const [featuredBgColors, setFeaturedBgColors] = useState<string[]>([]);
  const [culturalBgColors, setCulturalBgColors] = useState<string[]>([]);

  useEffect(() => {
    const loadColors = async (imageUrls: string[], setter: Function) => {
      try {
        const colors = await Promise.all(
          imageUrls.map(async (url) => {
            try {
              return await getDominantColor(url);
            } catch (error) {
              console.error(`Error processing ${url}:`, error);
              return "#FFFFFF"; // Fallback color
            }
          })
        );
        setter(colors);
      } catch (error) {
        console.error("Error loading colors:", error);
        // Set fallback colors array matching imageUrls length
        setter(Array(imageUrls.length).fill("#FFFFFF"));
      }
    };

    // Featured attractions images
    loadColors(
      [
        "/images/fort-jesus.jpg",
        "/images/haller-park1.jpg",
        "/images/diani-beach2.jpg",
        "/images/watamu1.jpg",
      ], // Removed extra image to match items count
      setFeaturedBgColors
    );

    // Cultural events images
    loadColors(
      [
        "/images/cultural1.jpg",
        "/images/cultural2.jpg",
        "/images/cultural3.jpg",
        "/images/cultural4.jpg",
      ],
      setCulturalBgColors
    );
  }, []);

  const createSlider = (
    title: string,
    items: Array<{ title: string; description: string; image: string }>,
    colors: string[]
  ) => (
    <div className="mb-12">
      <h3 className="text-2xl font-bold mb-6 px-4">{title}</h3>
      <div className="flex overflow-x-auto pb-4 gap-4 px-4 scrollbar-hide">
        {items.map((item, index) => (
          <div
            key={index}
            className="min-w-[300px] flex-shrink-0 shadow-lg rounded-lg p-4 relative transition-colors duration-300"
            style={{ backgroundColor: colors[index] || "#ffffff" }}
          >
            <img
              src={item.image}
              alt={item.title}
              className="rounded-t-lg h-48 w-full object-cover"
              crossOrigin="anonymous" // Important for CORS
              loading="lazy"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-100 text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section className="py-16 bg-lime-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Explore Mombasa's Offerings
        </h2>

        {/* Featured Attractions Slider */}
        {createSlider(
          "Featured Attractions",
          [
            {
              title: "Fort Jesus",
              description: "UNESCO World Heritage Site with rich history.",
              image: "/images/fort-jesus.jpg",
            },
            {
              title: "Haller Park",
              description: "Nature lover’s paradise with beautiful landscapes.",
              image: "/images/haller-park1.jpg",
            },
            {
              title: "Diani Beach",
              description: "Pristine beaches with crystal-clear waters.",
              image: "/images/diani-beach2.jpg",
            },
            {
              title: "Mombasa Carnival",
              description: "Vibrant coastal culture through music and dance.",
              image: "/images/watamu1.jpg",
            },
          ],
          featuredBgColors
        )}

        {/* Cultural Events Slider */}
        {createSlider(
          "Cultural Events",
          [
            {
              title: "Swahili Festival",
              description: "Traditional crafts and coastal culinary delights.",
              image: "/images/cultural1.jpg",
            },
            {
              title: "Lamu Cultural Week",
              description: "Experience ancient Swahili traditions.",
              image: "/images/cultural2.jpg",
            },
            {
              title: "Mombasa Food Expo",
              description: "Taste authentic coastal cuisine.",
              image: "/images/cultural3.jpg",
            },
            {
              title: "Taarab Music Night",
              description: "Traditional Swahili musical performances.",
              image: "/images/cultural4.jpg",
            },
          ],
          culturalBgColors
        )}
      </div>
    </section>
  );
}
