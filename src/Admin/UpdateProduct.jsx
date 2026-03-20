import React, { useEffect, useState } from "react";
import "../AdminStyles/UpdateProduct.css";
import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";
import Footer from "../components/Footer";
import { removeErrors, removeSuccess, updateProduct } from "../features/Admin/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProductDetails } from "../features/products/productSlice";
import { toast } from "react-toastify";

function UpdateProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [oldImage, setOldImage] = useState([]);      // existing images
  const [images, setImages] = useState([]);          // new images to upload
  const [imagesPreview, setImagesPreview] = useState([]);

  const { product } = useSelector((state) => state.product);
  const { success, loading, error } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { updateId } = useParams();

  const categories = [
    "Batik on Cotton",
    "Batik on Silk",
    "Batik on Chiffon",
    "Batik on Crepe",
    "Batik on Polish",
    "Batik on Patches",
    "Batik on Soft Brocade",
  ];

  // Fetch product details
  useEffect(() => {
    dispatch(getProductDetails(updateId));
  }, [dispatch, updateId]);

  // Populate form with existing product data
  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
      setCategory(product.category);
      setStock(product.stock);
      setOldImage(product.image || []);
    }
  }, [product]);

  // Handle new image uploads
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]); // base64 images
        }
      };

      reader.readAsDataURL(file);
    });
  };

  // Submit updated product
  const updateProductSubmit = (e) => {
    e.preventDefault();

    // Only send image field if there are new images
    const productData = {
      name,
      price,
      description,
      category,
      stock,
      ...(images.length > 0 && { image: images }),
    };

    dispatch(updateProduct({ id: updateId, productData }));
  };

  // Show notifications
  useEffect(() => {
    if (success) {
      toast.success("Product updated successfully!", { position: "top-center", autoClose: 3000 });
      dispatch(removeSuccess());
      navigate("/admin/products");
    }
    if (error) {
      toast.error(error, { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
    }
  }, [dispatch, success, error]);

  return (
    <>
      <Navbar />
      <PageTitle title="Update Product" />
      <div className="update-product-wrapper">
        <h1 className="update-product-title">Update Product</h1>
        <form className="update-product-form" onSubmit={updateProductSubmit}>
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            className="update-product-input"
            required
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="price">Product Price</label>
          <input
            type="number"
            className="update-product-input"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <label htmlFor="description">Product Description</label>
          <textarea
            id="description"
            className="update-product-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label htmlFor="category">Product Category</label>
          <select
            id="category"
            className="update-product-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map((cat, index) => (
              <option value={cat.toLowerCase().replace(" ", "-")} key={index}>
                {cat}
              </option>
            ))}
          </select>

          <label htmlFor="stock">Product Stock</label>
          <input
            type="number"
            id="stock"
            className="update-product-input"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />

          <label htmlFor="image">Product Images</label>
          <div className="update-product-file-wrapper">
            <input
              type="file"
              accept="image/*"
              id="image"
              multiple
              onChange={handleImageChange}
              className="update-product-file-input"
            />
          </div>

          {/* New Image Previews */}
          <div className="update-product-preview-wrapper">
            {imagesPreview.map((img, index) => (
              <img
                src={img}
                alt="New Preview"
                className="update-product-preview-image"
                key={index}
              />
            ))}
          </div>

          {/* Existing Images */}
          <div className="update-product-old-images-wrapper">
            {Array.isArray(oldImage) &&
              oldImage.map((img, index) => (
                <img
                  src={img.url}
                  alt="Old Product"
                  className="update-product-old-image"
                  key={index}
                />
              ))}
          </div>

          <button className="update-product-submit-btn" disabled={loading}>
            {loading ? "Updating..." : "Update Product"}
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default UpdateProduct;