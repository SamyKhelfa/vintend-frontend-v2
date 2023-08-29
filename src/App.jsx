import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./assets/components/CheckoutForm";

//import Header from "./components/Header";
import Home from "./pages/Home";
import Signup from "./pages/SignUp";
import SignIn from "./pages/SignIn";
//import Publish from "./pages/Publish";
import Offer from "./pages/Offer";

//import Payment from "./pages/Payment";

//import { library } from "@fortawesome/fontawesome-svg-core";
//import { faSearch, faCheck, faRedo } from "@fortawesome/free-solid-svg-icons";
//library.add(faSearch, faCheck, faRedo);

function App() {
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [sortPrice, setSortPrice] = useState(false);
  const [fetchRangeValues, setFetchRangeValues] = useState([0, 10000]);
  const [search, setSearch] = useState("");
  const stripePromise = loadStripe(
    "pk_test_51NkQ5CEcGykLbOWEqDxX2ry5mdDoAb54zYhmHiTOsJPvcYQPuJ98JdBLpNnOfJgwOkQUTuEIBiw3uNOgzYIwLA2000b6ds2RMS"
  );

  const setUser = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("token", token);
    } else {
      setToken(null);
      Cookies.remove("token");
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              fetchRangeValues={fetchRangeValues}
              sortPrice={sortPrice}
              search={search}
              setUser={setUser}
              token={token}
              setFetchRangeValues={setFetchRangeValues}
              setSortPrice={setSortPrice}
              setSearch={setSearch}
            />
          }
        />
        <Route path="/signup" element={<Signup setUser={setUser} />} />

        {/* <Route path="/publish" element={<Publish token={token} />} /> */}
        <Route path="/offer/:id" element={<Offer />} />
        {/* <Route path="/payment" element={<Payment />} /> */}
        <Route path="/signin" element={<SignIn />} />
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </Routes>
    </Router>
  );
}

export default App;
