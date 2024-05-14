"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Nike from  "/nike.png";


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
    }, 2000);

    return () => clearInterval(slideInterval);
  }, [nextSlide]);

  return (
    <div className="relative w-full max-w-4xl mx-auto rounded-xl overflow-hidden mt-10 ">
      <div className="relative w-full min-h-[50vh] md:min-h-[60vh] max-h-full overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute top-0 left-0 w-full h-full opacity-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="flex  items-center justify-center  gap-0 p-2  h-full w-full shadow-inner bg-gray-500 bg-opacity-20">
              <div className="flex flex-col items-start  justify-start space-y-4 flex-1 pl-6">
                <p className="text-sm md:text-lg bg-orange-400 px-2 rounded-lg">
                  {slide.discount}
                </p>

                <h3 className="text-xl md:text-3xl font-bold">{slide.name}</h3>
                <p className="text-sm">{slide.description}</p>
                <br />
                <Button className="md:w-1/2 ">Shop Now</Button>
              </div>
              <Image
                className="rounded-xl flex-1"
                src={slide.image}
                alt={slide.name}
                objectFit="fill"
                width={200}
                height={400}
                         />
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
