import { useDispatch, useSelector } from "react-redux";
import './store';
import './Veg.css';
import { AddToCart } from "./store";
import { useState } from "react";

function Veg() {
  const dispatch = useDispatch();
  const vegproducts = useSelector(globalState => globalState.products.veg);

  const [selectedRanges, setSelectedRanges] = useState([]);

  const priceRanges = [
    { label: "Below ₹20", min: 0, max: 20 },
    { label: "₹21 - ₹30", min: 21, max: 30 },
    { label: "₹31 - ₹40", min: 31, max: 40 },
    { label: "₹41 - ₹50", min: 41, max: 50 },
    { label: "₹51 - ₹60", min: 51, max: 60 },
    { label: "₹61 - ₹70", min: 61, max: 70 },
    { label: "Above ₹71", min: 71, max: Infinity }
  ];

  const handleRangeChange = (range) => {
    const exists = selectedRanges.find(r => r.label === range.label);
    if (exists) {
      setSelectedRanges(selectedRanges.filter(r => r.label !== range.label));
    } else {
      setSelectedRanges([...selectedRanges, range]);
    }
  };

  const filteredProducts = selectedRanges.length === 0
    ? vegproducts
    : vegproducts.filter(product =>
        selectedRanges.some(range => product.price >= range.min && product.price <= range.max)
      );

  const vegListItems = filteredProducts.map((product, index) => (
    <li key={index}>
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.price} Rs</p>
      <button onClick={() => dispatch(AddToCart(product))}>Add to Cart</button>
    </li>
  ));

  return (
    <>
      <h1 style={{ textAlign: "center", color: 'green' }}>Veg Items</h1>

      <div className="container">
        <div className="sidebar">
          <strong>Filter by Price:</strong>
          {priceRanges.map((range, index) => (
            <div key={index}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedRanges.some(r => r.label === range.label)}
                  onChange={() => handleRangeChange(range)}
                />
                {range.label}
              </label>
            </div>
          ))}
        </div>

        <div className="product-list">
          <ol>
            {vegListItems}
          </ol>
        </div>
      </div>
    </>
  );
}

export default Veg;