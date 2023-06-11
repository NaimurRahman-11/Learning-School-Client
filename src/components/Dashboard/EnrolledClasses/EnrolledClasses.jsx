import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";



const EnrolledClasses = () => {

    const { user } = useContext(AuthContext);

    const { data: paymentDetails = [] } = useQuery(['payments'], async () => {
        const res = await fetch('http://localhost:5000/payments')
        return res.json();
    });

    const userClasses = paymentDetails
    .filter((payment) => payment.email === user?.email)
    .map((payment) => ({
      ...payment,
      classNames: payment.itemNames.map((itemName) => (
        <div key={itemName}>{itemName}</div>
      ))
    }));
    

    return (
        <div className="container">
        <h1>Enrolled Classes</h1>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Transaction ID</th>
              <th>Price</th>
              <th>Date</th>
              <th>Class Name</th>
              {/* Add additional columns if needed */}
            </tr>
          </thead>
          <tbody>
            {userClasses.map((payment, index) => (
              <tr key={payment._id}>
                <td>{index + 1}</td>
                <td>{payment.email}</td>
                <td>{payment.transactionId}</td>
                <td>${payment.price}</td>
                <td>{payment.date}</td>
                <td>{payment.classNames}</td>
                {/* Add additional columns if needed */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
};

export default EnrolledClasses;