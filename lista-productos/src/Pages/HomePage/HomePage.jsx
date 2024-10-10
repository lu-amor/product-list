import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./HomePage.module.css";
import ProductCard from "../../Components/ProductCard/ProductCard";
import Modal from "../../Components/modal/modal";

function HomePage({ products, deleteProduct, addProduct, updateProduct }) {
  const [currentCategory, setCurrentCategory] = useState("none");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentCategory != "none") {
      navigate(`/Aisle/${currentCategory}`);
    }
  }, [currentCategory]);

  const handleCategoryChange = (event) => {
    setCurrentCategory(event.target.value);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
      setIsModalOpen(false);
  };

  return (
    <div className={classes.homePageContainer}>
      <header>
        <div>
          <h1 className="title is-1" id={classes.title}>
            Shopping List
          </h1>
        </div>
        <div className={classes.buttonContainer}>
          <div>
            <div className="select is-fullwidth">
              <select name="category" onChange={handleCategoryChange}>
                <option value="none">None</option>
                <option value="Fruits">Fruits</option>
                <option value="Grains">Grains</option>
                <option value="Dairy">Dairy</option>
              </select>
            </div>
          </div>
          <button className="button" id={classes.addProductButton} onClick={() => openModal()}>
            add product
          </button>
        </div>
      </header>
      <div className={classes.cardsContainer}>
        {products.map((product) => {
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
      {isModalOpen && (
        <Modal closeModal={closeModal} addProduct={addProduct}/>
      )}
    </div>
  );
}

export default HomePage;
