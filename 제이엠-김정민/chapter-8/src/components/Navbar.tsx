import { FaShoppingCart } from "react-icons/fa";
import { calculateTottal, type CartState } from "../slices/cartSlice";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useCustomRedux";
const Navbar = () => {
  const { cartItems, amount } = useAppSelector(
    (state): CartState => state.cart
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(calculateTottal());
  }, [dispatch, cartItems]); // disPatch ,cartItems가 변경될 때마다 리렌더링

  return (
    <div className="flex justify-between item-center p-4 bg-gray-600 text-white">
      <h1
        className="text-2xl font-semibold cursor-pointer"
        onClick={() => {
          window.location.href = "/";
        }}
      >
        Jung
      </h1>
      <div className="flex items-center space-x-2">
        <FaShoppingCart className="text-2xl" />
        <span className="text-xl font-medium">{amount}</span>
      </div>
    </div>
  );
};

export default Navbar;
