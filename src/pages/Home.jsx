import "../App.css";
// import du package axios
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function Home() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const id = useParams();
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offers/${id}`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <div>
      <div className="container">
        <div className="header">
          <div className="logo">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Vinted_logo.png/1200px-Vinted_logo.png"
              alt="logo"
              style={{ width: "104px", height: "45px" }}
            />
          </div>
          <div className="search">
            <input type="text" placeholder="Recherche des articles" />
          </div>
          <div className="login">
            <button>Se connecter</button>
            <button>S'inscrire</button>
          </div>
          <div className="sale">
            <button>Vends tes articles</button>
          </div>
        </div>
      </div>
      <div className="home">
        <div className="home-container"></div>
      </div>
      <div className="offers">
        <section className="product-name">
          {data.offers.map((offer, index) => {
            <div key={index}>
              <h3>{offer.product_name}</h3>
              <p>{offer.product_price} €</p>
              {data.product_details.map((detail, index) => {
                console.log("hello", detail);
                <div key={index}>
                  <p>{detail.MARQUE}</p>
                  <p></p>
                </div>;
              })}
            </div>;
          })}
        </section>
      </div>
    </div>
  );
}

export default Home;
