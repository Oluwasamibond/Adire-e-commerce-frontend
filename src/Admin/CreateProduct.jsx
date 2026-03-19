import React, { useEffect, useState } from "react";
import "../AdminStyles/CreateProduct.css";
import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  removeErrors,
  removeSuccess,
} from "../features/Admin/adminSlice";
import { toast } from "react-toastify";

function CreateProduct() {
  const { success, loading, error } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const catgories = [
    "Batik on Cotton",
    "Batik on Silk",
    "Batik on Chiffon",
    "Batik on Crepe",
    "Batik on Polish",
    "Batik on Patches",
    "Batik on Soft Brocade",
  ];

  // ✅ FIX: Use JSON instead of FormData
  const createProductSubmit = (e) => {
    e.preventDefault();

    const productData = {
      name,
      price,
      description,
      category,
      stock,
      images, // base64 images
    };

    dispatch(createProduct(productData));
  };

  // ✅ Image handler (base64)
  const createProductImage = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
    }

    if (success) {
      toast.success("Product created successfully!", {
        position: "top-center",
        autoClose: 3000,
      });

      // ✅ Reset form after success
      setName("");
      setPrice("");
      setDescription("");
      setCategory("");
      setStock(0);
      setImages([]);
      setImagesPreview([]);

      dispatch(removeSuccess());
    }
  }, [dispatch, error, success]);

  return (
    <>
      <Navbar />
      <PageTitle title="Create Product" />

      <div className="create-product-container">
        <h1 className="form-title">Create New Product</h1>

        <form className="product-form" onSubmit={createProductSubmit}>
          <input
            type="text"
            className="form-input"
            placeholder="Enter Product Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="number"
            className="form-input"
            placeholder="Enter Product Price"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <input
            type="text"
            className="form-input"
            placeholder="Enter Product Description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <select
            className="form-select"
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {catgories.map((cat, index) => (
              <option
                value={cat.toLowerCase().replace(" ", "-")}
                key={index}
              >
                {cat}
              </option>
            ))}
          </select>

          <input
            type="number"
            className="form-input"
            placeholder="Enter Product Stock"
            required
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />

          <div className="file-input-container">
            <input
              type="file"
              accept="image/*"
              className="form-input-file"
              multiple
              onChange={createProductImage}
            />
          </div>

          <div className="image-preview-container">
            {imagesPreview.map((image, index) => (
              <img
                src={image}
                alt="Product Preview"
                className="image-preview"
                key={index}
              />
            ))}
          </div>

          <button className="submit-btn" disabled={loading}>
            {loading ? "Creating..." : "Create"}
          </button>
        </form>
      </div>

      <Footer />
    </>
  );
}

export default CreateProduct;