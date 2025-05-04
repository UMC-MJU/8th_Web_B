import {  UseFormRegister } from "react-hook-form";
import { FormFields } from "../pages/SignupPage";

interface Props {
    name: string;
    register: UseFormRegister<FormFields>;
    error?: string;
    onSubmit: () => void;
  }
  
  const SignupStepProfile = ({ name, register, error, onSubmit }: Props) => {
    return (
      <div className="flex flex-col gap-3 items-center">
        <div className="w-[100px] h-[100px] bg-gray-300 rounded-full"></div>
        <input
          {...register("name")}
          type="text"
          placeholder="닉네임을 입력하세요"
          className={`w-[300px] p-2 rounded border ${
            error ? "border-red-500 bg-red-200" : "border-gray-300"
          }`}
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button
          onClick={onSubmit}
          disabled={!name || !!error}
          className="w-full bg-pink-500 text-white py-2 rounded disabled:bg-gray-400"
        >
          회원가입 완료
        </button>
      </div>
    );
  };

export default SignupStepProfile;