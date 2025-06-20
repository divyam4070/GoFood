import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [search, setSearch] = useState('');

  const loadData = async () => {
    let response = await fetch(`${BASE_URL}/api/foodData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();

    setFoodItem(response[0]);
    setFoodCat(response[1]);
    // console.log(response[0],response[1])
  };
  useEffect(() => {
    loadData();
  }, []);
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
        <div className="carousel-inner" id="carousel">
          <div className="carousel-caption" style={{ zIndex: "10" }}>
            <div className="d-flex justify-content-center" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}} />
              {/* <button className="btn btn-outline-success text-white bg-success " type="submit">
                Search
              </button> */}
            </div>
          </div>
          <div className="carousel-item active">
            <img
              src="https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              className="d-block w-100"
              style={{ filter: "brightness(30%)" }}
              alt="1"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              className="d-block w-100"
              style={{ filter: "brightness(30%)" }}
              alt="2"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              className="d-block w-100"
              style={{ filter: "brightness(30%)" }}
              alt="3"
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" style={{filter: "invert(1) sepia(1) saturate(5) hue-rotate(180deg)"}} aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" style={{filter: "invert(1) sepia(1) saturate(5) hue-rotate(180deg)"}} aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      </div>
      <div className="container">
        {foodCat.length > 0 ? (
          foodCat.map((data) => {
            return (
              <div key = {data._id} className="row mb-3">
              
                <div key ={data._id} className="fs-3 m-3">{data.CategoryName}</div>
                <hr />
                {foodItem.length > 0 ? (
                  foodItem
                    .filter((item) => item.CategoryName === data.CategoryName && item.name.toLowerCase().includes(search.toLowerCase()))
                    .map((filterItems) => (
                      <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                        <Card foodItem = {filterItems} options={filterItems.options[0]}  > </Card>
                      </div>
                    ))
                ) : (
                  <div>No such data found</div>
                )}
                </div>
              
            );
          })
        ) : (
          <div>""""</div>
        )}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
