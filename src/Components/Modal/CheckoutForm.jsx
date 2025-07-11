import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2"; // or use react-toastify

const CheckoutForm = ({ badge }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const card = elements.getElement(CardElement);
    if (!stripe || !card) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      Swal.fire("Error", error.message, "error");
      return;
    }

    // Call your backend to create a paymentIntent
    const res = await axiosSecure.post("/create-payment-intent", {
      amount: badge.price,
    });

    const clientSecret = res.data.clientSecret;

    const confirm = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          name: badge.name,
        },
      },
    });

    if (confirm.error) {
      Swal.fire("Payment failed", confirm.error.message, "error");
    } else {
      if (confirm.paymentIntent.status === "succeeded") {
        // Save payment info to DB
        await axiosSecure.post("/payments", {
          badgeId: badge._id,
          badgeName: badge.name,
          price: badge.price,
          date: new Date(),
        });

        // Update user's badge
        await axiosSecure.patch(`/user/badge`, {
          badge: badge.name,
        });

        Swal.fire("Success!", "Payment successful & badge updated.", "success");
      }
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement className="bg-white p-4 rounded-md mb-4" />
      <button
        className="btn btn-primary"
        type="submit"
        disabled={!stripe || loading}
      >
        {loading ? "Processing..." : `Pay ৳${badge.price}`}
      </button>
    </form>
  );
};

export default CheckoutForm;
