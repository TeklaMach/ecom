// import React from 'react';
// import { Button } from '@mui/material';
// import { Product } from '../pages/types/Types';
// import './Cart.css'
// interface CartProps {
//   cartItems: Product[];
// }

// const Cart: React.FC<CartProps> = ({ cartItems }) => {
//   if (cartItems.length === 0) {
//     return (
//       <>
//       <div
//      className="cartHeader">
//       <h1>Cart is Empty</h1>
//     </div>
//     <div className='cartState'>
//        <span >Shop all to continue shopping</span>
//     </div>
//       </>
    
//     )
//   }
//   return (
//     <>
//     <div className="cartHeader">
//     <h2>Shopping Cart</h2>
//     </div>
//       <div className="cardItemsContainer">
        
//         <ul className="cartItemList">
//           {cartItems.map((item) => (
//             <li key={item.id} className="cartItems">
//               <img className="cartItemImg" src={item.images[0]} alt={item.title} />
//               <p className="cartItemTitle">{item.brand}</p>
//               <p className="cartItemPrice">{Number(item.price).toFixed() + '$'}</p>
//               <p className="cartItemAmount">{Number(item.amount)}</p>
//             </li>
//           ))}
//         </ul>
//       </div>
//       <div className="checkout">
//         <Button className="checkoutButton" variant="contained" color="primary">
//           Check Out
//         </Button>
//       </div>
//     </>
//   );
// };

// export default Cart;
import React from 'react';
import './Cart.css';
import { Product } from '../pages/types/Types';
import { DeleteOutlined } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/Store';
import { removeFromCart } from '../redux/CartReducer';

interface CartProps {
  cartItems: Product[];
}

const Cart: React.FC<CartProps> = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.cart.cartItems);

  const total = () => {
    let total = 0;
    products.forEach((item) => (total += item.amount * Number(item.price)));
    return total.toFixed();
  };

  if (products.length === 0) {
    return (
      <div className='cart'>
        <div className="cartHeader">
          <h1>Cart is Empty</h1>
        </div>
        <div className='cartState'>
          <span>Shop all to continue shopping</span>
        </div>
      </div>
    );
  }

  return (
    <div className='cart'>
      <h1>Cart</h1>
      {products.map((item: any) => (
        <div key={item.id} className="cartItems">
          <img className="cartItemImg" src={item.images[0]} alt={item.title} />
          <p className="cartItemTitle">{item.brand}</p>
          <p className="cartItemPrice">{Number(item.price).toFixed() + '$'}</p>
          <p className="cartItemAmount">{Number(item.amount)}</p>
          <DeleteOutlined className='delete' onClick={() => dispatch(removeFromCart(item.id))} />
        </div>
      ))}
      <div className='total'>
        <span>SUBTOTAL</span>
        <span>${total()}</span>
      </div>
      <Button variant="contained" color="secondary">Proceed To CheckOut</Button>
    </div>
  );
};

export default Cart;
