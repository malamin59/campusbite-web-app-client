import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Typewriter from "typewriter-effect";

import banner1 from "../../../assets/image/image1.jpg";
import banner2 from "../../../assets/image/image1.jpeg";

const BannerSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <div className="w-full mt-2 px-2 pb-7">
      <Slider {...settings}>
        {/* Slide 1 */}
        <div className="relative h-[65vh] overflow-hidden rounded-lg">
          <img
            src={banner1}
            alt="Banner 1"
            className="w-full h-full object-cover brightness-75"
          />
          <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
            <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
              <Typewriter
                options={{
                  strings: [
                    "Find Your Ideal Roommate",
                    "Welcome to our Roommate Finder Platform.",
                    "The most popular Roommate Finder Website in the world.",
                  ],
                  autoStart: true,
                  loop: true,
                  cursor: true,
                  cursorStyle: "_",
                  delay: 70,
                  deleteSpeed: 50,
                  pauseFor: 1500,
                }}
              />
            </h1>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="relative h-[65vh] overflow-hidden rounded-lg">
          <img
            src={banner2}
            alt="Banner 2"
            className="w-full h-full object-cover brightness-75"
          />
          <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
            <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
              <Typewriter
                options={{
                  strings: [
                    "Roomster makes it easy to find roommates.",
                    "Explore rooms for rent now!",
                  ],
                  autoStart: true,
                  loop: true,
                  cursor: true,
                  cursorStyle: "_",
                  delay: 70,
                  deleteSpeed: 50,
                  pauseFor: 1500,
                }}
              />
            </h1>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default BannerSlider;
