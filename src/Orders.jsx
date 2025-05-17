import { useSelector } from "react-redux";

function Orders() {

  const orderProduct = useSelector(globalState => globalState.Orders);

  
        const orderItemsList = orderProduct.map((orders, index) => (
          <li key={index} className="order-entry">
            <ul>
              <p><strong>order ID:</strong>{orders.orderId}</p>
              <p><strong>Order Date:</strong> {orders.date}</p>
            <ul className="order-items">
              {orders.items.map((item, index) => (
                <li key={index} className="order-item">
                  <img src={item.image} alt={item.name} width={50} height={50} />
                  <p><strong>Items:</strong>{item.name}</p>
                  <p><strong>Price:</strong>{item.price.toFixed(2)}</p>
                  <p><strong>Quantity:</strong>{item.quantity}</p>
                  <p><strong>Total:</strong>{item.price * item.quantity}</p>
                </li>
              ))}
            </ul>
            <p><strong>Total Paid:</strong> ₹{orders.finalPrice.toFixed(2)}</p>
            </ul>
          </li>
        ));


  return (
    <div className="orders-container">
      <h2>Purchase History</h2>

      {
        orderProduct.length === 0 ? (
          <p>No Purchase Itmes Are Here.....</p>
        ):(
          <>
          <h1>Your Orders</h1>
          <ol>{orderItemsList}</ol>
          </>
        )
      }
    </div>
  );
}

export default Orders;
