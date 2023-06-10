


import CheckoutForm from "./CheckoutForm";

import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";



const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment = () => {

    const { user } = useContext(AuthContext);
   
    const { data: classes = [] } = useQuery(['classes', { email: user.email }], async () => {
        const res = await fetch(`http://localhost:5000/carts?email=${user.email}`);
        return res.json();
    });

    const total = classes.reduce(
        (sum, item) => parseFloat(item.price) + sum,
        0
    );

    const price = parseFloat(total.toFixed(2));
    
    return (
        <div className="container mt-5">
           
            
            <Elements stripe={stripePromise}>
                <CheckoutForm cart={classes} price={price}></CheckoutForm>
            </Elements>
        </div>
    );
};

export default Payment;






