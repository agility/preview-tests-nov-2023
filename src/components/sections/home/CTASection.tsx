import React from "react";

export default function CTASection() {
  return (
    <section className="py-16 bg-blue-600 text-white text-center">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Plan Your Mombasa Adventure?
        </h2>
        <p className="text-lg mb-8">
          Join us today and experience unforgettable moments at the Kenyan
          coast.
        </p>
        <button className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-200 transition">
          Get Started
        </button>
      </div>
    </section>
  );
}
