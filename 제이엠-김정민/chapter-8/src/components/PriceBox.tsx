// import { clearCart, type CartState } from "../slices/cartSlice";
import { useAppDispatch, useAppSelector } from "../hooks/useCustomRedux";
import { openModal } from "../slices/modalSlice";
import { useCartInfo } from "../store/zustandStore";

const PriceBox = () => {
  // const { total } = useAppSelector((state): CartState => state.cart);
  const dispatch = useAppDispatch();
  //redux-toolkit 사용
  const { total } = useCartInfo();

  const handleInititalizeCart = () => {
    dispatch(openModal(""));
    //edux-toolkit 사용할 때
  };

  return (
    <div className="p-12 flex justify-between">
      <button
        className="border p-4 rounded-md cursor-pointer"
        onClick={handleInititalizeCart}
      >
        장바구니 초기화
      </button>
      <div>총 가격: {total}원</div>
    </div>
  );
};

export default PriceBox;
