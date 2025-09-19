import { HashLoader } from "react-spinners";

const LoadingSpinner = ({ message = "Please wait...", color = "#0ea5e9" }) => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-base-200 to-white text-center px-4">
      {/* Spinner */}
      <HashLoader size={80} color={color} speedMultiplier={1.5} />

      {/* Animated Message */}
      <p className="mt-6 text-xl md:text-2xl font-semibold text-gray-600 animate-pulse">
        {message}
      </p>

      {/* Optional: Subtext */}
      <p className="text-sm mt-2 text-gray-400">Products is loading...</p>
    </div>
  );
};

export default LoadingSpinner;
