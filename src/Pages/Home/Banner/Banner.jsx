import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Typewriter from "typewriter-effect";
import { FiSearch } from "react-icons/fi";

// import banner1 from "../../../assets/image/image1.jpg";
import banner1 from "../../../assets/image/i-1.jpg";
import banner2 from "../../../assets/image/i-2.jpg";
import banner3 from "../../../assets/image/i-3.jpg";
import banner4 from "../../../assets/image/i-4.png";

const BannerSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
    autoplaySpeed: 4000,
  };
  const handleClick = (e) => {
    e.preventDefault();
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
                    "Shop Your Favorite Clothes Easily",
                    "Welcome to the Online Cloth Ordering App",
                    "Browse, Order, and Manage Your Wardrobe Seamlessly",
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
                onClick={handleClick}
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
                    "Empower Customers with Easy Online Shopping",
                    "Centralized Cloth Management for Smooth Ordering",
                    "Optimize Your Wardrobe with Real-Time Updates and Deals",
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
                onClick={handleClick}
                type="submit"
                className="bg-info text-white px-4 rounded-r-md hover:bg-info-dark transition-colors"
              >
                Search
              </button>
            </form>
          </div>
        </div>
        {/* Slide 2 */}
        <div className="relative h-[300px] lg:h-[400px] overflow-hidden rounded-lg">
          <img
            src={banner3}
            alt="Banner 3"
            className="w-full h-full object-cover brightness-75"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
            <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-8">
              <Typewriter
                options={{
                  strings: [
                    "Shop Your Favorite Clothes Easily",
                    "Browse, Select, and Order in Seconds",
                    "Get the Best Deals on Trendy Outfits",
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
                onClick={handleClick}
                type="submit"
                className="bg-info text-white px-4 rounded-r-md hover:bg-info-dark transition-colors"
              >
                Search
              </button>
            </form>
          </div>
        </div>
        {/* Slide 4*/}
        <div className="relative h-[300px] lg:h-[400px] overflow-hidden rounded-lg">
          <img
            src={banner4}
            alt="Banner 4"
            className="w-full h-full object-cover brightness-75"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
            <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-8">
              <Typewriter
                options={{
                  strings: [
                    "Discover Clothes You'll Love Every Day",
                    "From Cart to Closet in Just a Few Clicks",
                    "Style Made Simple - Shop with Ease",
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
                placeholder="Search Cloths, reviews..."
                className="w-full pl-10 py-2 text-white 
                border
                rounded-l-md focus:outline-none"
              />
              <button
                onClick={handleClick}
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
