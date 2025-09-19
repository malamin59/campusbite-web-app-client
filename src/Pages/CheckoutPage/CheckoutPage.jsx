import { useLoaderData } from "react-router";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../../Components/Modal/CheckoutForm";
// import CheckoutForm from "./CheckoutForm";

// Load your Stripe public key from environment variables
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const CheckoutPage = () => {
  const badge = useLoaderData();

  if (!badge) {
    return (
      <p className="text-center mt-10 text-red-500 font-semibold">
        Failed to load badge data.
      </p>
    );
  }

  return (
    <div className="max-w-xl lg:mx-auto mx-6 md:mx-auto md:mt-22 mt-10 p-4  
     bg-gradient-to-r from-blue-900 via-purple-900 to-pink-900
    rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Checkout for <span className="text-primary">{badge.name}</span> Badge
      </h2>

      <Elements stripe={stripePromise}>
        <CheckoutForm badge={badge} />
      </Elements>
    </div>
  );
};

export default CheckoutPage;
