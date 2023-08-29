// import "../App.css";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "../assets/components/CheckoutForm";

// je me connecte à mon compte stripe en front, en utilisant ma clef publique
const stripePromise = loadStripe(
  "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
);

function Payment() {
  // Elements  va devoir englober toute la logique de paiement. Je lui donne en props stripePromise pour lui montrer que je suis bien connecté à mon compte
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}

export default Payment;
