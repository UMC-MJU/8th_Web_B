import CartItem from "./CartItem";
// import type { CartState } from "../slices/cartSlice";
// import { useAppSelector } from "../hooks/useCustomRedux";
import { useCartInfo } from "../store/zustandStore";

const CartList = () => {
  // const { cartItems } = useAppSelector((state): CartState => state.cart); redux-toolkit을 활용한 상태관리
  const { cartItems } = useCartInfo();

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
