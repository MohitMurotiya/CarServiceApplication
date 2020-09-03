import React, { useEffect, useState } from "react";
import CustomerService from "../../services/customer/customer_service";
import AuthService from "../../services/customer/authentication/auth_service";
import "./CSS/MyBookings.css";

function MyBookings() {
  const [orders, setorders] = useState([]);

  useEffect(() => {
    const user = AuthService.getCurrentCustomer();
    CustomerService.findMyOrders(user.userId)
      .then((res) => {
        setorders(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="container">
      <ul>
        {orders.map((order) => (
          <li>
            {order.carNumber}&nbsp; {order.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyBookings;
