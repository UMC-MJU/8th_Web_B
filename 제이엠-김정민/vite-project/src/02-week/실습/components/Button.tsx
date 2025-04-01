interface ButtonProps {
    //?:를 통해 undefined값도 들어올 수 있다고 표현
    onClick?: () => void;
    text: string;
}

const Button = ({ onClick, text }: ButtonProps) => {
    return <button onClick={onClick}>{text}</button>;
};

export default Button;