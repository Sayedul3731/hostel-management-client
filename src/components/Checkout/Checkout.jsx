import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import SectionTitle from "../SectionTitle/SectionTitle";
import { useLoaderData } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_payment_gateway_key);
const Checkout = () => {
    const packageData = useLoaderData();
    const badge = packageData.title;
    const price = packageData.price;
    return (
        <div className="px-12 max-w-7xl mx-auto   min-h-screen text-black">
            <SectionTitle heading="checkout"></SectionTitle>
            <p className="mb-2"> <span className="font-semibold">Package:</span> {packageData.title}</p>
            <p className="mb-10"> <span className="font-semibold">Details:</span> {packageData.details}</p>
            <h1 className="text-xl font-semibold mb-5">Payment Here:</h1>
            <div className="flex justify-center">
                <div className="w-1/2 mb-5 border border-green-400 bg-white p-5">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm badge={badge} price={price}></CheckoutForm>
                    </Elements>
                </div>
            </div>
        </div>
    );
};

export default Checkout;