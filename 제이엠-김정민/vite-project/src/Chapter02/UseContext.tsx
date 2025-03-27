import { useContext } from 'react';
import ButtonGroup from '../components/ButtonGroup';
import { CounterContext, useCount } from '../context/CounterProvider';

function App() {
    // const context = useContext(CounterContext);
    //useCount라는 커스텀 훅을 만듬
    // 따라서 ?.이런 식으로 접근 X => 왜냐하면 우리가 에러를 던져주기 때문.
    const {count} = useCount();

    console.log(count);

    return (
        <>
            <h1>{count}</h1>
            <ButtonGroup/>
        </>
    );
}

export default App;