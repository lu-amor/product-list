import React, {useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import classes from "./Aisle.module.css";
import ProductCard from "../../Components/ProductCard/ProductCard";

function Aisle({ products, deleteProduct, updateProduct }) {
  const [currentCategory, setCurrentCategory] = useState("none");
  let { category } = useParams();
  const navigate = useNavigate();

  const selectedProducts = products.filter(
    (currentProduct) => currentProduct.category === category
  );

  async function fetchSport() {
    try {
        const response = await fetch("http://localhost:3000/Aisle" + `/${category}`, { method: "GET" });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error fetching data: ", error);
    }
  }

  useEffect(() => {
      let promise = fetchSport();
      promise.then((currentCategory) => {
          setCurrentCategory(currentCategory);
      });
  }, []);

  return (
    <div className={classes.aislePage}>
      <header>
        <h1 className="title is-1" id={classes.title}>{category}</h1>
        <button className="button" onClick={() => navigate("/home")}>go home</button>
      </header>
      <div className={classes.cardsContainer}>
        {selectedProducts.map((product) => {
          return (
            <ProductCard
              key={product.id}
              product={product}
              deleteProduct={deleteProduct}
              updateProduct={updateProduct}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Aisle;
