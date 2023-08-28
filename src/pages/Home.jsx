import "../App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home({ fetchRangeValues, search, sortPrice }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offers?priceMin=${
            fetchRangeValues[0]
          }&priceMax=${fetchRangeValues[1]}&sort=${
            sortPrice ? "price-desc" : "price-asc"
          }&title=${search}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [fetchRangeValues, sortPrice, search]);

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
            <Link to="/signup">
              <button>S'inscrire</button>
            </Link>
            <Link to="/signin">
              <button>Se connecter</button>
            </Link>
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
          {data.offers.map((offer, index) => (
            <Link key={index} to={`/offer/${offer._id}`}>
              <div>
                <h3>{offer.product_name}</h3>
                <p>{offer.product_price} €</p>
                {offer.product_details.map((detail, detailIndex) => (
                  <div key={detailIndex}>
                    <p>{detail.MARQUE}</p>
                  </div>
                ))}
                <img
                  src={offer.product_image.secure_url}
                  alt="product"
                  className="offer-image"
                />{" "}
              </div>
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
}

export default Home;
