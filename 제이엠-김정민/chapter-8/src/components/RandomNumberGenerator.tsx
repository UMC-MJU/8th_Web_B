import { useCounterStore } from "../store/counterStore";
import { useShallow } from "zustand/shallow";

const RandomNumberGenerator = () => {
  // const { randomNumber, random } = useCounterStore((state) => state);
  // 이것도 마찬가지로 위에 counter 컴포넌트가 리렌더링됨 따라서 useShallow로 관리

  const { randomNumber, random } = useCounterStore(
    useShallow((state) => ({
      randomNumber: state.randomNumber,
      random: state.action.random,
    }))
  );

  return (
    <>
      <h1 className="flex justify-center">{randomNumber}</h1>
      <div className="flex justify-center">
        <button
          className="px-2 py-1 border border-gray-400 rounded-md cursor-pointer"
          onClick={random}
        >
          랜덤 변수{" "}
        </button>
      </div>
    </>
  );
};

export default RandomNumberGenerator;
