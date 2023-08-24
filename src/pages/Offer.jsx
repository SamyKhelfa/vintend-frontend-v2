import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Offer() {
  const { id } = useParams();
  console.log("id :", id);

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
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
  }, [id]);

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <div>
      <img src={data.product_image.secure_url} alt={data.product_name} />
    </div>
  );
}

export default Offer;
