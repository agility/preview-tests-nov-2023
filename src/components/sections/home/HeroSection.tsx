import React from "react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="text-center">
      <h1 className="font-black text-4xl">Welcome to Mombasa</h1>
      <p className="text-lg mt-4">Discover the hidden gems in Mombasa</p>
      <div className="gap-3">
        <Link
          href="/login"
          className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Register
        </Link>
      </div>
    </section>
  );
}
