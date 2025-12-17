import React from "react";
import "../pageStyles/Home.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ImageSlider from "../components/ImageSlider";
import Product from "../components/Product";
import PageTitle from "../components/PageTitle";

const products = [
  {
    _id: "6932b209579c790c268c97a1",
    name: "sami adire",
    description: "new adire",
    price: 5000,
    ratings: 4,
    image: [
      {
        public_id: "This is test id",
        url: "this is test url",
        _id: "6932b209579c790c268c97a2",
      },
    ],
    category: "batik",
    stock: 8,
    numOfReviews: 1,
    reviews: [
      {
        user: "692d21fce755fab9186cef45",
        name: "Samuel",
        rating: 4,
        comment: "I love this product",
        _id: "69352b529c7bf85414ce64f9",
      },
    ],
    createdAt: "2025-12-05T10:20:57.105+00:00",
    __v: 1,
  },
   {
    _id: "692be5f88a4234845e65c97b",
    name: "Product-4",
    description: "description-4",
    price: 100,
    ratings: 0,
    image: [
      {
        public_id: "This is test id",
        url: "this is test url",
        _id: "692be5f88a4234845e65c97c",
      },
    ],
    category: "batik",
    stock: 2,
    numOfReviews: 0,
    reviews: 0,
    createdAt: "2025-11-30T06:36:40.105+00:00",
    __v: 0,
  },
  
];

function Home() {
  return (
    <>
    <PageTitle title="Home - AdireByMkz" />
      <Navbar />
      <ImageSlider />
      <div className="home-container">
        <h2 className="home-heading">Trending Now</h2>
        <div className="home-product-container">
          {products.map((product, index) => (
            <Product product={product} key={index}/>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
