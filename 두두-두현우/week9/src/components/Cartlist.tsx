import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import { RootState } from "@reduxjs/toolkit/query";

const Cartlist = () => {
  const { cartItems, amount, total } = useASelector(
    (state: RootState) => state.cart
  );
  return (
    <div className="flex flex-col items-center justify-center">
      <ul>
        {cartItems.map((item) => (
          <CartItem key={item.id} lp={item} />
        ))}
      </ul>
    </div>
  );
};

export default Cartlist;
