// import React from "react";
// import useAuth from "../../../Hooks/useAuth";
// import useAxiosSecure from "../../../Hooks/useAxiosSecure";
// import { useQuery } from "@tanstack/react-query";

// const PaymentHistory = () => {
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();
//   const { data: payment } = useQuery({
//     queryKey: ["user"],
//     enabled: !!user?.email,
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/payment/${user?.email}`);
//       return res.data;
//     },
//   });
//   console.log(payment)
//   return <div>My Payment history </div>;
// };

// export default PaymentHistory;


import PaymentTable from "../../../Components/Table/PaymentTable";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payment = [], isLoading } = useQuery({
    queryKey: ["payment-history", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payment/${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4 mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">My Payment History</h2>
      <PaymentTable payments={payment} />
    </div>
  );
};

export default PaymentHistory;
