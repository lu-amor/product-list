import React, {useEffect, useState} from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage.jsx";
import Aisle from "./Pages/Aisle/Aisle.jsx";
import "./App.css";

function App() {
  const url = "http://localhost:3000/products";
  const [products, setProducts] = useState([]);

  async function fetchDataAW() {
    try {
      const response = await fetch(url, { method: "GET" });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  }

  useEffect(() => {
    let productsPromise = fetchDataAW();

    productsPromise.then((data) => {
      setProducts([...data]);
    });
  }, []);

  async function postProduct(product) {
    try {
      await fetch(url, {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  }

  const updateProductAW = async (updatedProduct) => {
    try {
      const response = await fetch(`${url}/${updatedProduct.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      });
    } catch (error) {
      console.log('Error updating product: ', error);
    }
  };

  async function deleteProductAW(product) {
    try {
      await fetch(url + `/${product.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error deleting product: ", error);
    }
  }

  const addProduct = async ({title, description, category, cantidad}) => {
    const newProduct = {
      title: title,
      description: description,
      category: category,
      cantidad: cantidad,
      comprado: false,
    };
    if (products.length < 20) {
      await postProduct(newProduct);
      setProducts([...products, newProduct]);
    } else {
      alert("You can't have more than 20 products in the list");
    }
  };

  const deleteProduct = (product) => {
    if (products.length > 5) {
      deleteProductAW(product);
      setProducts([
        ...products.filter((currentSport) => currentSport.id !== product.id),
      ]);
    } else {
      alert("You must have at least 5 products in the list");
    }
  };

  const updateProduct = (updatedProduct) => {
    updateProductAW(updatedProduct);
    setProducts([
      ...products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product),
    ]);
  };

  return (
    <Routes>
      <Route path="/*" element={<Navigate replace to="/home" />} />
      <Route path="/home" element={<HomePage products={products} deleteProduct={deleteProduct} addProduct={addProduct} updateProduct={updateProduct}/>} />
      <Route path="/aisle/:category" element={<Aisle products={products} deleteProduct={deleteProduct} updateProduct={updateProduct}/>} />
    </Routes>
  );
}

export default App;
