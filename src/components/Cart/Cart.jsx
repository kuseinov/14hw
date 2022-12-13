import React, { useContext } from "react";
import Modal from "../UI/Modal";
import styles from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const totalAmount = `$ ${cartCtx.totalAmount.toFixed(2)}`

  const cartItemRemoveHandler = (id) => {
	cartCtx.removeItem(id)
  };

  const cartItemAddHandler = (item) => {
	cartCtx.addItem(item)
  };

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartCtx.items?.map((item) => {
        return (
          <CartItem
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            amount={item.amount}
			onRemove={cartItemRemoveHandler}
			onAdd={cartItemAddHandler}
			item={item}
          />
        );
      })}
    </ul>
  );
  return (
    <Modal onHideCart={props.onHideCart}>
      {cartItems}
      <div className={styles.total}>
        <span>Total Price</span>
        <span>{totalAmount}</span>
      </div>
      <div className={styles.actions}>
        <button className={styles["button--alt"]} onClick={props.onHideCart}>
          Close
        </button>
        <button className={styles.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;
