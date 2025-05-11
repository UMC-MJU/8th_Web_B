import { UseFormRegister } from "react-hook-form";
import {FormFields} from "../pages/SignupPage";

interface Props {
    email: string;
    error?: string;
    register: UseFormRegister<FormFields>;
    onNext: () => void;
  }
  
  const SignupStepEmail = ({ email, error, register, onNext }: Props) => {
    return (
      <div className="flex flex-col gap-3">
        <input
          {...register("email")}
          className={`w-[300px] p-2 rounded border ${
            error ? "border-red-500 bg-red-200" : "border-gray-300"
          }`}
          type="email"
          placeholder="이메일을 입력해주세요!"
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button
          onClick={onNext}
          disabled={!email || !!error}
          className="w-full bg-pink-500 text-white py-2 rounded disabled:bg-gray-400"
        >
          다음
        </button>
      </div>
    );
  };
  
export default SignupStepEmail;