import Button from './Button';
import { useCount } from '../context/CounterProvider';

// interface ButtonGroupProps {
//     //?:를 통해 undefined값도 들어올 수 있다고 표현현
//     handleIncrement?: () => void;
//     handleDecrement?: () => void;
// }

const ButtonGroup = () => {
    const {handleDecrement, handleIncrement} = useCount();
    return (
        <div>
            {/* <button onClick={handleIncrement}>+1 증가</button> */}
            {/* <button onClick={handleDecrement}>-1 감소</button> */}
            <Button onClick={handleIncrement} text='+1 증가' />
            <Button onClick={handleDecrement} text='-1 감소' />
        </div>
    );
};

export default ButtonGroup;