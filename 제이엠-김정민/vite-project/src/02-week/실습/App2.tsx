// import './App.css'
import { useState } from 'react';


function App2() {
    const [count, setCount] = useState<number>(0);
    const handleIncreaseNumber = () => {
        // React는 상태를 즉시 업데이트 X => 함수를 실행할 당시의 상태를 기억
        //1. 한번에 값을 업데이트
        // setCount(count + 1) // 0 -> 1
        // setCount(count + 1) // 0 -> 1
        // setCount(count + 1) // 0 -> 1
        // setCount(count + 1) // 0 -> 1
        // setCount(count + 1) // 0 -> 1
        // setCount(count + 1) // 0 -> 1
        //2. 이전 상태 값을 인자로 전달하여 업데이트트
        setCount( prev => prev + 1);
        setCount( prev => prev + 1);
        setCount( prev => prev + 1);
        setCount( prev => prev + 1);
        setCount( prev => prev + 1);
        setCount( prev => prev + 1);
    }
    return (
        <>
            <h1>{count}</h1>
            <button onClick={handleIncreaseNumber}>숫자 증가</button>
        </>
    );
}

export default App2