import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AddToCart } from './store';

function Milk() {
 let Milk = useSelector(globalState => globalState.products.Milk);
  let dispatch = useDispatch()
  let MilkListItems = Milk .map((products,index)=>(
    <li key={index}>
      <img src={products.image} alt={products.name}/>
      <h3>{products.name}</h3><p>{products.price} Rs</p>
      <button onClick={()=>dispatch(AddToCart(products))}>Add to Cart</button>

    </li>
  ))
  return (
    <>
     <h1 style={{color:'blue',textAlign:'center'}}> Milk</h1> 
     <ol>
      {MilkListItems}
     </ol>
    </>
  )
}

export default Milk