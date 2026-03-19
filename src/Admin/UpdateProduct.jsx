import React, { useEffect, useState } from "react";
import "../AdminStyles/UpdateProduct.css";
import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";
import Footer from "../components/Footer";
import { updateProduct } from "../features/Admin/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductDetails } from "../features/products/productSlice";

function UpdateProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [oldImage, setOldImage] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const {product} = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const {updateId} = useParams();

  const catgories = [
    "Batik on Cotton",
    "Batik on Silk",
    "Batik on Chiffon",
    "Batik on Crepe",
    "Batik on Polish",
    "Batik on Patches",
    "Batik on Soft Brocade",
  ];

  useEffect(() => {
    dispatch(getProductDetails(updateId));
  }, [dispatch, updateId]);

  const handleImageChange = (e) => {
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

  const updateProductSubmit = (e) => {
    e.preventDefault();

    const productData = {
      name,
      price,
      description,
      category,
      stock,
      images, // base64 images
    };

    dispatch(updateProduct({ id: productId, productData }));
  };

  return (
    <>
      <Navbar />
      <PageTitle title="Update Product" />
      <div className="update-product-wrapper">
        <h1 className="update-product-title">Update Product</h1>
        <form
          className="update-product-form"
          encType="multipart/form-data"
          onSubmit={updateProductSubmit}
        >
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            className="update-product-input"
            required
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="price">Product Price</label>
          <input
            type="number"
            id="price"
            name="price"
            className="update-product-input"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <label htmlFor="description">Product Description</label>
          <textarea
            id="description"
            name="description"
            className="update-product-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label htmlFor="category">Product Category</label>
          <select
            id="category"
            name="category"
            className="update-product-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {catgories.map((cat, index) => (
              <option value={cat.toLowerCase().replace(" ", "-")} key={index}>
                {cat}
              </option>
            ))}
          </select>
          <label htmlFor="stock">Product Stock</label>
          <input
            type="number"
            id="stock"
            name="stock"
            className="update-product-input"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
          <label htmlFor="image">Product Images</label>
          <div className="update-product-file-wrapper">
            <input
              type="file"
              accept="image/"
              id="image"
              name="image"
              className="update-product-file-input"
              multiple
              onChange={handleImageChange}
            />
          </div>
          <div className="update-product-preview-wrapper">
            {imagesPreview.map((img, index) => (
              <img
                src={img}
                alt="Product Preview"
                className="update-product-preview-image"
                key={index}
              />
            ))}
          </div>
          <div className="update-product-old-images-wrapper">
            {oldImage.map((img, index) => (
              <img
                src={img}
                alt="Old Product Image"
                className="update-product-old-image"
                key={index}
              />
            ))}
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default UpdateProduct;
