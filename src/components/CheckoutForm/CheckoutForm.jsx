import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { useState,useEffect } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const CheckoutForm = () => {
    const [error, setError] = useState('')
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('')
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const user = useAuth();
    const price = 300;

    useEffect( () => {
        axiosSecure.post('/create-payment-intent', {price})
        .then( res => {
            console.log('client secret',res.data.clientSecret);
            setClientSecret(res.data.clientSecret)
        })
    },[axiosSecure])
    const handleSubmit = async(e) => {

        e.preventDefault();

        if(!stripe || !elements){
            return;
        }
        const card = elements.getElement(CardElement)
        if(card === null){
            return;
        }
        // payment method 
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if(error){
            console.log('payment error', error);
            setError(error.message)
        }else{
            console.log('payment method', paymentMethod);
            setError('')
        }

        // confirm payment 
        const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })
        if(confirmError){
            console.log('confirm error');
        }
        else{
            console.log('payment intent', paymentIntent);
            if(paymentIntent.status === 'succeeded'){
                console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id)
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
            <button className="px-7 py-1 font-semibold rounded-sm shadow-sm hover:shadow-red-500 bg-green-500 text-white my-4" type="submit" disabled={!stripe || !clientSecret} >
                Pay
            </button>
                <p className="text-red-500 ">{error}</p>
                {
                    transactionId && <p className="text-green-500">Your Transaction Id: {transactionId}</p>
                }
      </form>
    );
};

export default CheckoutForm;