import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import axios from "axios";

function Offer() {
  const { id } = useParams();
  console.log("id :", id);

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("test");
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );

        console.log("test", response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, [id]);

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <div>
      <Link to="/">Retour</Link>
      <img src={data.product_image.secure_url} alt={data.product_name} />
      <p>{data.product_price} €</p>
      {data.product_details.map((detail, index) => {
        console.log(detail);
        const keys = Object.keys(detail);
        // console.log(keys);
        const key = keys[0];
        // console.log(key);
        return (
          <p key={index}>
            {key} : {detail[key]}
          </p>
        );
      })}
    </div>
  );
}

export default Offer;
