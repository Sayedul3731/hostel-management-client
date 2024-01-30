/* eslint-disable react/prop-types */
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { useState, useEffect } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const CheckoutForm = ({ badge, price }) => {
    const [error, setError] = useState('')
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('')
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const user = useAuth();
    console.log(user);

    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price })
            .then(res => {
                console.log('client secret', res.data.clientSecret);
                setClientSecret(res.data.clientSecret)
            })
    }, [axiosSecure, price])
    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement)
        if (card === null) {
            return;
        }
        // payment method 
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            console.log('payment error', error);
            setError(error.message)
        } else {
            console.log('payment method', paymentMethod);
            setError('')
        }

        // confirm payment 
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })
        if (confirmError) {
            console.log('confirm error');
        }
        else {
            console.log('payment intent', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id', paymentIntent.id);
                Swal.fire({
                    title: "Success!",
                    text: "Your payment has been succeeded.",
                    icon: "success"
                });
                setTransactionId(paymentIntent.id)
                axiosSecure.patch(`/users/${user?.email}`, { badge })
                    .then(res => {
                        console.log('user update', res.data);
                    })
            }
        }
    }


    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4'
                            }
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className="px-7 py-1 font-semibold rounded-sm shadow-sm hover:shadow-red-500 bg-green-500   my-4" type="submit" disabled={!stripe || !clientSecret} >
                Pay
            </button>
            <p className="text-red-500 ">{error}</p>
            {
                transactionId && <p> <span className="font-semibold">Your Transaction Id:</span> <span className="text-green-500">{transactionId}</span></p>
            }
        </form>
    );
};

export default CheckoutForm;