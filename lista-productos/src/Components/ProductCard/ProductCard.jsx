import React, { useState } from "react";
import classes from "./ProductCard.module.css";

function ProductCard({ product, deleteProduct, updateProduct }) {
  const [comprado, setComprado] = useState(product.comprado);

  const handleCompradoBtn = () => {
    product.comprado = !product.comprado;
    setComprado(product.comprado);
    updateProduct(product);
  };

  const handleDeleteBtn = () =>{
    deleteProduct(product);
  }

  return (
    <div className={classes.cardContainer}>
      <div className={classes.cardContent}>
        <h4 className="title is-4" id={classes.title}>
          {product.title}
        </h4>
        <p>
          <strong>Cantidad:</strong> {product.cantidad}
        </p>
        <div className={classes.buttonsContainer}>
          <button onClick={handleCompradoBtn}>{comprado ? "❌" : "✅"}</button>
          <button onClick={handleDeleteBtn}>🗑️</button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
