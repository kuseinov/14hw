import React, { useReducer } from "react";
import CartContext from "./cart-context";

const initialState = {
  items: [],
  totalAmount: 0,
};
// начальное состояние

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD": {
      const updatedTotalAmount = state.totalAmount + action.item.price;

      const existingCartItemIndex = state.items.findIndex((item) => {
        return item.id === action.item.id;
      });
      // ищем индекс существующего объекта

      const existingCartItem = state.items[existingCartItemIndex];
      // присваивает existingCartItem'у айтемы из existingCartItemIndex

      let updatedItems;

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + 1,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItem] = updatedItem;
      } else {
        updatedItems = state.items.concat(action.item);
      }

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
      // если нету совпадения в проверке выше то он нам возвращает этот стэйт
    }
    case "REMOVE": {
      const existingCartItemIndex = state.items.findIndex((item) => {
        return item.id === action.id;
      });
      // ищем индекс существующего объекта
      const existingItem = state.items[existingCartItemIndex];

      const updatedTotalAmount = state.totalAmount - existingItem.price;

      let updatedItems;

      if (existingItem.amount === 1) {
        updatedItems = state.items.filter((item) => item.id !== action.id);
        // если amount из existingItem равняется одному то фильтруем айтемы из стейта чтобы айдишки item'a и action'a не были похожи
      } else {
        const updatedItem = {
          ...existingItem,
          amount: existingItem.amount - 1,
        };

        updatedItems = [state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      }

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
      // если нету совпадения в проверке выше то он нам возвращает этот стэйт
    }

    default:
      return state;
  }
};

const CartProvider = (props) => {
  const [cartState, dispatch] = useReducer(reducer, initialState);

  const addItemToCartHandler = (item) => {
    dispatch({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatch({ type: "REMOVE", id: id });
  };

  return (
    <CartContext.Provider
      value={{
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
