import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = ({ totalPrice, productName }) => {
  const [isPaid, setIsPaid] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // On récupère ici les données bancaires que l'utilisateur rentre
    const cardElement = elements.getElement(CardElement);

    // Demande de création d'un token via l'API Stripe
    // On envoie les données bancaires dans la requête
    const stripeResponse = await stripe.createToken(cardElement, {
      name: "L'id de l'acheteur",
    });
    console.log(stripeResponse);

    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/payment",
        {
          amount: totalPrice, // Utilisez la valeur de totalPrice que vous avez
          title: productName,
          token: stripeResponse.token.id,
        }
      );
      console.log(response.data);
      // Si la réponse du serveur est favorable, la transaction a eu lieu
      if (response.data) {
        setIsPaid(true);
      } else {
        alert("Une erreur est survenue, veuillez réessayer.");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {isPaid ? (
        <span>Paiement effectué !</span>
      ) : (
        <form onSubmit={handleSubmit}>
          <CardElement />
          <button type="submit">Valider</button>
        </form>
      )}
    </>
  );
};

export default CheckoutForm;
