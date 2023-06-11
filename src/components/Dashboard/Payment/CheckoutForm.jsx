import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import './CheckoutForm.css';
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../../Providers/AuthProvider";
import Swal from "sweetalert2";

const CheckoutForm = ({ cart, price }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();
    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');

    useEffect(() => {
        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
                .catch(error => {
                    console.log('Error fetching client secret:', error);
                });
        }
    }, [price, axiosSecure]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            console.log('Payment method creation error:', error);
            setCardError(error.message);
            return;
        }

        setProcessing(true);

        try {
            const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
                clientSecret,
                {
                    payment_method: {
                        card: card,
                        billing_details: {
                            email: user?.email || 'unknown',
                            name: user?.displayName || 'anonymous'
                        }
                    }
                }
            );

            if (confirmError) {
                console.log('Error confirming card payment:', confirmError);
                return;
            }

            console.log('Payment intent:', paymentIntent);

            if (paymentIntent.status === 'succeeded') {
                setTransactionId(paymentIntent.id);

                const payment = {
                    email: user?.email,
                    transactionId: paymentIntent.id,
                    price,
                    date: new Date(),
                    quantity: cart.length,
                    cartItems: cart.map(item => item._id),
                    menuItems: cart.map(item => item.menuItemId),
                    status: 'service pending',
                    itemNames: cart.map(item => item.className)
                };

                axiosSecure.post('/payments', payment)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.insertedId) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Payment Successful',
                                text: 'Your payment has been successfully processed.',
                                confirmButtonText: 'OK',
                              });
                        
                        }
                    })
                    .catch(error => {
                        console.log('Error saving payment:', error);
                    });
            }
        } catch (error) {
            console.log('Error during payment processing:', error);
        }

        setProcessing(false);
    };

    return (
        <>
            <h1>Payable Amount: ${ price}</h1>
            <form className="container" onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="btn primaryBtn mt-2" type="submit" disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </form>
            {cardError && <p className="">{cardError}</p>}
            {transactionId && <p className="">Transaction complete with transactionId: {transactionId}</p>}
        </>
    );
};

export default CheckoutForm;
