import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

function SignUp({ setUser }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  return (
    <>
      <h1>S'inscrire</h1>
      <div className="signup">
        <form action="">
          <input type="text" placeholder="Nom d'utilisateur" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Mot de passe" />
          <button>S'inscrire</button>
          <Link to="/signin">Tu as déjà un compte ? Connecte-toi !</Link>
        </form>
      </div>
    </>
  );
}

export default SignUp;
