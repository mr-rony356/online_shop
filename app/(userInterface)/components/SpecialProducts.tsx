"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Nike from "/nike.png";

interface Slide {
  id: number;
  name: string;
  image: string;
  discount: string;
  description: string;
}

const SpecialProductCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides: Slide[] = [
    {
      id: 1,
      name: "Nike Air Force 1",
      image: "/nike.png",
      discount: "20% off",
      description:
        "Classic sneaker with a timeless design and superior comfort.",
    },
    {
      id: 2,
      name: "Air Jordan 1 Retro High",
      image: "/jordan.png",
      discount: "30% off",
      description:
        "Iconic basketball shoe with premium materials and legendary style.",
    },
    {
      id: 3,
      name: "Adidas Trefoil T-Shirt",
      image: "/shirt.png",
      discount: "30% off",
      description:
        "Casual and comfortable t-shirt with the classic Adidas logo.",
    },
  ];

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
  };

  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === slides.length - 1 ? 0 : prevSlide + 1
    );
  };

  useEffect(() => {
    const slideInterval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(slideInterval);
  }, [nextSlide]);

  return (
    <div className="mt-8 mx-auto w-full max-w-4xl overflow-hidden relative">
      <div className="relative rounded-xl w-full min-h-[68vh] md:min-h-[50vh]  max-h-full overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="flex items-center justify-center flex-col md:flex-row p-4 h-full w-full shadow-black  bg-zinc-300 bg-opacity-20">
              <div className="flex flex-col items-start justify-start space-y-4 flex-1 pl-6">
                <p className="ext-sm md:text-lg  bg-orange-400 px-2 rounded-lg">
                  {slide.discount}
                </p>

                <h3 className="text-2xl md:text-3xl  font-bold">
                  {slide.name}
                </h3>
                <p className="text-base lg:text-lg">
                  {slide.description}
                </p>
                <Button className="p-6 text-lg !mt-5">
                  Shop Now
                </Button>
              </div>
              <div className="flex-1">
                <Image
                  className="rounded-xl"
                  src={slide.image}
                  alt={slide.name}
                  width={800}
                  height={800}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentSlide ? "bg-white" : "bg-gray-400"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default SpecialProductCarousel;
