import { FaShoppingCart } from "react-icons/fa";
// import { calculateTottal, type CartState } from "../slices/cartSlice";
import { useEffect } from "react";
// import { useAppDispatch, useAppSelector } from "../hooks/useCustomRedux";
import { useCartActions, useCartInfo } from "../store/zustandStore";
const Navbar = () => {
  // const { cartItems, amount } = useAppSelector(
  //   (state): CartState => state.cart
  // );
  // const dispatch = useAppDispatch();
  //redux-toolkit을 활용한 상태 관리

  const { amount, cartItems } = useCartInfo();
  const { calculateTotals } = useCartActions();
  //zustand를 활용한 상태관리

  useEffect(() => {
    // dispatch(calculateTottal()); redux-toolkit을 활용할 떄
    calculateTotals();
    //cartItem에 아이템 추가/삭제/수량변경이 일어나면 calculateTotals()함수 호출
    //
  }, [/*dispatch*/ cartItems, calculateTotals]); // disPatch ,cartItems가 변경될 때마다 리렌더링

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
