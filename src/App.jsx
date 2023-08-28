import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";

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
      </Routes>
    </Router>
  );
}

export default App;
