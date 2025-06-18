import CartItem from "./CartItem";
import type { CartState } from "../slices/cartSlice";
import { useAppSelector } from "../hooks/useCustomRedux";

const CartList = () => {
  const { cartItems } = useAppSelector((state): CartState => state.cart);

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

export default CartList;
