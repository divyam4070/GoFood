import React, { useEffect, useState, useRef } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";
import { useNavigate } from "react-router-dom";

export default function Card(props) {
  let dispatch = useDispatchCart();
  let options = props.options;
  let foodItem = props.foodItem;
  let data = useCart();
  let navigate = useNavigate();
  let priceOptions = Object.keys(options);

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const priceRef = useRef();

  useEffect(() => {
    setSize(Object.keys(options)[0]);
  }, [options]);
  
  const handleAddToCart = async () => {
  let existingItem = null;

  for (const item of data) {
    if (item.id === foodItem._id && item.size === size) {
      existingItem = item;
      break;
    }
  }

  if (existingItem) {
    await dispatch({
      type: "UPDATE",
      id: foodItem._id,
      size: size,
      price: finalPrice,
      qty: qty,
    });
  } else {
    await dispatch({
      type: "ADD",
      id: foodItem._id,
      name: foodItem.name,
      price: finalPrice,
      qty: qty,
      size: size,
      img: props.ImgSrc,
    });
  }
};


  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);
  let finalPrice = qty * parseInt(options[size]);

  return (
    <div>
      <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
        <img
          src={props.foodItem.img}
          className="card-img-top"
          alt="..."
          style={{ height: "170px", objectFit: "fill" }}
        />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>

          <div className="container w-100">
            <select
              className="m-2 h-100 bg-success rounded"
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
            >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>

            <select
              className="m-2 h-100 bg-success rounded"
              ref={priceRef}
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
              {priceOptions.map((data) => {
                return (
                  <option key={data} value={data}>
                    {data}
                  </option>
                );
              })}
            </select>

            <div className="d-inline h-100 fs-5">₹{finalPrice}/-</div>
          </div>

          <hr />
          <button className="btn btn-success justify-content-center ms-2" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
