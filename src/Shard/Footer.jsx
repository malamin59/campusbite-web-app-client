import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-sky-300 text-base-content mt-20 ">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* About Section */}
        <div>
          <h2 className="text-xl font-bold mb-2">CampusBite</h2>
          <p>
            Your trusted hostel meal and review management platform. Streamline student meals,
            enhance dining experience, and manage with ease.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-bold mb-2">Quick Links</h2>
          <ul className="space-y-2">
            <li><a className="link link-hover">Home</a></li>
            <li><a className="link link-hover">Meals</a></li>
            <li><a className="link link-hover">Reviews</a></li>
            <li><a className="link link-hover">Admin Panel</a></li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h2 className="text-xl font-bold mb-2">Contact Us</h2>
          <p className="flex items-center gap-2"><FaLocationDot /> University Campus, Bangladesh</p>
          <p className="flex items-center gap-2"><FaEnvelope /> support@campusbite.com</p>

          <div className="mt-4 flex gap-4 text-2xl">
            <a href="#" className="hover:text-blue-500"><FaFacebook /></a>
            <a href="#" className="hover:text-blue-400"><FaTwitter /></a>
            <a href="#" className="hover:text-pink-600"><FaInstagram /></a>
          </div>
        </div>
      </div>

      <div className="text-center py-4 border-t border-gray-300 mt-6 text-sm">
        &copy; {new Date().getFullYear()} CampusBite. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
