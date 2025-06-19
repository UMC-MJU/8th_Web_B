import { useCounterActions } from "../store/counterStore";

const CounterButton = () => {
  // const increment = useCounterStore((state) => state.action.increment);
  // const decrement = useCounterStore((state) => state.action.decrement);

  const { increment, decrement } = useCounterActions();
  //훨씬 깔끔해짐.

  return (
    <>
      <button
        className="items-center px-2 py-1 border border-gray-400 rounded-md cursor-pointer"
        onClick={increment}
      >
        증가
      </button>
      <button
        className="items-center px-2 py-1 border border-gray-400 rounded-md cursor-pointer"
        onClick={decrement}
      >
        감소
      </button>
    </>
  );
};

export default CounterButton;
