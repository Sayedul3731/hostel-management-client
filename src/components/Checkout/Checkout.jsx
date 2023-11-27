import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import SectionTitle from "../SectionTitle/SectionTitle";

const stripePromise = loadStripe(import.meta.env.VITE_payment_gateway_key);
const Checkout = () => {
    return (
        <div>
            <SectionTitle heading="checkout"></SectionTitle>
            <div className="px-12">
                <Elements stripe={stripePromise}>
                    <CheckoutForm></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Checkout;