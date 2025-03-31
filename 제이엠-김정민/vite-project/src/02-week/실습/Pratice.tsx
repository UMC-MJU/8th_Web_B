import { useState } from "react";

function Pratice () {
    const [count,setCount] = useState<number>(0);
    const plusCount = () => {
        setCount(prev => prev +1 );
    }

    const minusCount = () => {
        setCount(prev => prev - 1);
    }

    return (
        <>
            <h1>증감기: {count}</h1>
            <button onClick={plusCount}>증가</button>
            <button onClick={minusCount}>감소소</button>
        </>
    );
}

export default Pratice