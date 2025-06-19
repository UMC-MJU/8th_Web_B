import { useCounterStore } from "../store/counterStore";
import { useShallow } from "zustand/shallow";
import CounterButton from "./CounterButton";

const Counter = () => {
  // const { count, increment, decrement } = useCounterStore((state) => state);
  //이렇게 하면 밑에 상관없는 random 컴포넌트도 리렌더링됨 => 성능이 떨어진다.

  const { count } = useCounterStore(
    useShallow((state) => ({
      count: state.count,
    }))
  );

  return (
    <>
      <h1 className="flex justify-center">{count}</h1>
      <div className="flex justify-center gap-4">
        <CounterButton />
      </div>
    </>
  );
};

export default Counter;
