
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Typewriter from "typewriter-effect";
import { FiSearch } from "react-icons/fi";

import banner1 from "../../../assets/image/image1.jpg";
import banner2 from "../../../assets/image/image1.jpeg";

const BannerSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <div className="relative w-full mt-2 pb-7">
      {/* Slider */}
      <Slider {...settings}>
        {/* Slide 1 */}
        <div className="relative h-[300px] lg:h-[400px] overflow-hidden rounded-lg">
          <img
            src={banner1}
            alt="Banner 1"
            className="w-full h-full object-cover brightness-75"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
            <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-8">
              <Typewriter
                options={{
                  strings: [
                    "Manage Your Hostel Meals Efficiently",
                    "Welcome to the University Hostel Management System",
                    "Streamline Meal and Review Management Seamlessly",
                  ],
                  autoStart: true,
                  loop: true,
                  cursor: true,
                  cursorStyle: "_",
                  delay: 100,
                  deleteSpeed: 70,
                  pauseFor: 1500,
                }}
              />
            </h1>

            {/*  Search Bar Inside Banner */}
            <form className="flex relative w-full max-w-md shadow-md">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white" />
              <input
                type="text"
                placeholder="Search meals, reviews..."
                className="w-full  pl-10 py-2 border text-white rounded-l-md focus:outline-none"
              />
              <button
                type="submit"
                className="bg-info text-white  px-4 rounded-r-md hover:bg-info-dark transition-colors"
              >
                Search
              </button>
            </form>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="relative h-[300px] lg:h-[400px] overflow-hidden rounded-lg">
          <img
            src={banner2}
            alt="Banner 2"
            className="w-full h-full object-cover brightness-75"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
            <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-8">
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
                  delay: 100,
                  deleteSpeed: 70,
                  pauseFor: 1500,
                }}
              />
            </h1>

            {/* Search Bar Again (for this slide) */}
            <form className="flex relative w-full  max-w-md shadow-md">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white" />
              <input
                type="text"
                placeholder="Search meals, reviews..."
                className="w-full pl-10 py-2 text-white 
                border
                rounded-l-md focus:outline-none"
              />
              <button
                type="submit"
                className="bg-info text-white px-4 rounded-r-md hover:bg-info-dark transition-colors"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default BannerSlider;

