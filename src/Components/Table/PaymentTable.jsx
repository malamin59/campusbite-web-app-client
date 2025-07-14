import moment from "moment"; 

const PaymentTable = ({ payments }) => {
  if (!payments || payments.length === 0) {
    return <p className="text-center mt-4 text-red-500">No payments found.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table w-full table-zebra">
        <thead className="bg-base-200">
          <tr>
            <th>Date</th>
            <th>Badge Name</th>
            <th>Price (৳)</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, index) => (
            <tr key={payment._id}>
              <td>{moment(payment.date).format("YYYY-MM-DD hh:mm A")}</td>
              {/* <td>{new Date(payment.date).toLocaleString()}</td> */}
              <td>{payment.badgeName}</td>
              <td>৳{payment.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentTable;
