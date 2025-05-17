import { useDispatch, useSelector } from 'react-redux';
import './Cart.css';
import { DecCart, IncCart, ClearCart, orderDetails, removeFromCart } from './store';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QRCode from 'react-qr-code';
import emailjs from 'emailjs-com';


function Cart() {
  let cartObjects = useSelector(globalState => globalState.cart);
  let orderHistory = useSelector(globalState => globalState.orders || []);
  let [discountPercentage, setDiscountPercentage] = useState(0);
  let [customerEmail, setCustomerEmail] = useState('');
  const emailRef = useRef();
  let [showThankYou, setThankYou] = useState(false);
  let [couponName, setCouponName] = useState('');
  let [couponCodeDiscountPer, setCouponCodeDiscountPer] = useState(0);
  const couponCodeRef = useRef();
  const [PaymentMethod, setPaymentMethod] = useState(' ');
  let dispatch = useDispatch();
  let navigate = useNavigate();

  let handlingCouponPer = () => {
    const couponCode = couponCodeRef.current.value.trim().toUpperCase();
    switch (couponCode) {
      case 'NITIN10':
        setCouponCodeDiscountPer(10);
        setCouponName(couponCode);
        break;
      case 'NITIN20':
        setCouponCodeDiscountPer(20);
        setCouponName(couponCode);
        break;
      case 'NITIN30':
        setCouponCodeDiscountPer(30);
        setCouponName(couponCode);
        break;
      default:
        alert('Invalid Coupon Code');
        setCouponCodeDiscountPer(0);
        setCouponName('');
    }
  };

  let countingAmount = () => {
    let totalPrice = cartObjects.reduce((totalPrice, item) => totalPrice + item.price * item.quantity, 0);
    let discount = (totalPrice * discountPercentage) / 100;
    let couponDiscount = (totalPrice * couponCodeDiscountPer) / 100;
    let priceAfterdiscount = totalPrice - discount - couponDiscount;
    let taxPrice = (priceAfterdiscount * 5) / 100;
    let finalPrice = priceAfterdiscount + taxPrice;
    return { totalPrice, discount, taxPrice, finalPrice, couponDiscount };
  };

  const { totalPrice, discount, taxPrice, finalPrice, couponDiscount } = countingAmount();

  let cartListItems = cartObjects.map((item, index) => (
    <li key={index} className="cart-item">
      <img src={item.image} alt={item.name} />
      <div className="cart-details">
        <p><strong>{item.name}</strong></p>
        <p>Price: ₹{item.price.toFixed(2)}</p>
        <p>Quantity: {item.quantity}</p>
      </div>
      <div className="cart-buttons">
        <button onClick={() => dispatch(IncCart(item))}>+</button>
        <button onClick={() => dispatch(DecCart(item))}>-</button>
        <button onClick={() => dispatch(removeFromCart(item))}>Remove</button>
      </div>
    </li>
  ));

  let handlingCart = () => {
    if (!customerEmail || !/\S+@\S+\.\S+/.test(customerEmail)) {
      alert('❌ Please enter a valid email address!');
      return;
    }

    const productDate = new Date().toLocaleDateString();
    const orderId = `ORD-${orderHistory.length + 1}`;
    const shipping = 50;

    let orderDetailsObject = {
      orderId: orderId,
      date: productDate,
      items: [...cartObjects],
      finalPrice: finalPrice,
    };

    dispatch(orderDetails(orderDetailsObject));
    setThankYou(true);

    let templateParams = {
      order_id: orderId,
      orders: cartObjects.map(item => ({
        name: item.name,
        price: (item.price * item.quantity).toFixed(2),
        units: item.quantity,
        image: item.image
      })),
      cost: {
        shipping: shipping,
        priceAfterDiscount: discount.toFixed(2),
        couponDiscount: couponDiscount.toFixed(2),
        tax: taxPrice.toFixed(2),
        total: (shipping + finalPrice).toFixed(2)
      },
      email: customerEmail
    };

    emailjs.send('service_f193bfr', 'template_6rkt76e', templateParams, 'Sl30XoQLoJvvrQPXa')
      .then(() => {
        alert('✅ Email sent successfully!');
      })
      .catch((error) => {
        alert('❌ Email sending failed: ' + error.text);
      });

    setTimeout(() => {
      dispatch(ClearCart());
      navigate("/Orders");
    }, 5000);
  };

  return (
    <div className="cart-container">
      {cartObjects.length > 0 ? (
        <>
          <h1>These are your Cart Items</h1>
          <ol className="cart-list">{cartListItems}</ol>
          <h3 style={{ textAlign: 'center' }}></h3>
          <div className="cart-summary">
            <h1 style={{ color: 'navyblue' }}>Order Summary</h1>
            <h2>Your Total Price is: ₹{totalPrice.toFixed(2)}</h2>
            <button onClick={() => setDiscountPercentage(10)}>Apply 10% Discount</button>
            <button onClick={() => setDiscountPercentage(20)}>Apply 20% Discount</button>
            <button onClick={() => setDiscountPercentage(30)}>Apply 30% Discount</button>
            <h2>Your Discount Price is: ₹{discount.toFixed(2)}</h2>
            <div className="coupon-section">
              <input type='text' ref={couponCodeRef} placeholder='Enter Coupon Code' className="coupon-input" />
              <button onClick={handlingCouponPer}>Add Coupon Code</button>
            </div>

            Coupon <strong>{couponName}</strong> applied: {couponCodeDiscountPer}% off
            <h2>Your Coupon Discount for {couponName}: ₹{couponDiscount.toFixed(2)}</h2>
            <h2>Your Tax Price is: ₹{taxPrice.toFixed(2)}</h2>
            <h2>Your Final Price is: ₹{finalPrice.toFixed(2)}</h2>

            <div className="paymentMethod">
              <h3>Select Payment Method:</h3>
              <button onClick={() => setPaymentMethod('qr')}>QR code</button>

              <div className='mb-3'>
                <label className='form-label'>
                  Enter Your Gmail to Recieve Order Confirmation
                </label>
                <input
                  type='email'
                  ref={emailRef}
                  onChange={(e => setCustomerEmail(e.target.value))}
                  className='form-control'
                  placeholder='you@example.com'
                />
              </div>

              {PaymentMethod === 'qr' && (
                <div className="qr section">
                  <h4>Scan UPI QR to pay ₹{finalPrice}</h4>
                  <QRCode value={`upi://pay?pa=nitinchaudhari12349@oksbi=Nitin&am=${finalPrice}&cu=INR`} />
                  <p>Use any Payment App like Gpay, PhonePay, Paytem, etc</p>
                </div>
              )}
            </div>

            <button onClick={handlingCart}>Order Now</button>
          </div>
        </>
      ) : (
        <>
          {showThankYou && (
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <h2 style={{ color: "green" }}>
                Thank you for your purchase! Redirecting to orders...
              </h2>
            </div>
          )}
          <img src='/images/CART.jpg' width={700} height={700} />
          <h1 style={{ textAlign: 'center', color: 'black' }}>Cart is Empty</h1>
        </>
      )}
    </div>
  );
}

export default Cart;
