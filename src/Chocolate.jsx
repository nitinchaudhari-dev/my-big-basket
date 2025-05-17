import { useDispatch, useSelector } from "react-redux";
import './store';
import './Veg.css';
import { AddToCart } from "./store";
import { useState } from "react";

function Chocolate() {
  const dispatch = useDispatch();

  // Correct variable name and state path
  const chocolateProducts = useSelector(globalState => globalState.products.chocolate);

  const [selectedRanges, setSelectedRanges] = useState([]);

  // Corrected price range definitions
  const priceRanges = [
    { label: "Below ₹10", min: 0, max: 10 },
    { label: "₹11 - ₹20", min: 11, max: 20 },
    { label: "₹21 - ₹30", min: 21, max: 30 }, // Fixed this from ₹22 - ₹30 to ₹21 - ₹30
    { label: "₹31 - ₹40", min: 31, max: 40 },
    { label: "₹41 - ₹50", min: 41, max: 50 }, // Fixed this from ₹31 - ₹50 to ₹41 - ₹50
    { label: "₹51 - ₹60", min: 51, max: 60 },
    { label: "Above ₹61", min: 61, max: Infinity }
  ];

  const handleRangeChange = (range) => {
    const exists = selectedRanges.find(r => r.label === range.label);
    if (exists) {
      setSelectedRanges(selectedRanges.filter(r => r.label !== range.label));
    } else {
      setSelectedRanges([...selectedRanges, range]);
    }
  };

  // Corrected variable usage: should refer to chocolateProducts, not vegproducts
  const filteredProducts = selectedRanges.length === 0
    ? chocolateProducts
    : chocolateProducts.filter(product =>
        selectedRanges.some(range => product.price >= range.min && product.price <= range.max)
      );

  const chocolateListItems = filteredProducts.map((product, index) => (
    <li key={index}>
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.price} Rs</p>
      <button onClick={() => dispatch(AddToCart(product))}>Add to Cart</button>
    </li>
  ));

  return (
    <>
      <h1 style={{ textAlign: "center", color: 'green' }}>Chocolate</h1> {/* Changed the header text to "Chocolate Items" */}

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
            {chocolateListItems}
          </ol>
        </div>
      </div>
    </>
  );
}

export default Chocolate;
