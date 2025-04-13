import { UseFormRegister, FieldErrors, FieldError } from "react-hook-form";
import { useState } from "react";
import { FormFields } from "../pages/SignupPage";

interface Props {
  password: string;
  passwordCheck: string;
  errors: FieldErrors;
  register: UseFormRegister<FormFields>;
  onNext: () => void;
}

const SignupStepPassword = ({ password, passwordCheck, errors, register, onNext }: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      <input
        {...register("password")}
        type={showPassword ? "text" : "password"}
        placeholder="비밀번호"
        className={`w-[300px] p-2 rounded border ${
          errors.password ? "border-red-500 bg-red-200" : "border-gray-300"
        }`}
      />

     {(errors.password as FieldError)?.message && (
  <div className="text-red-500 text-sm">
    {(errors.password as FieldError).message}
  </div>
)}

      <input
        {...register("passwordCheck")}
        type={showPassword ? "text" : "password"}
        placeholder="비밀번호 확인"
        className={`w-[300px] p-2 rounded border ${
          errors.passwordCheck ? "border-red-500 bg-red-200" : "border-gray-300"
        }`}
      />
      {(errors.passwordCheck as FieldError)?.message && (
  <div className="text-red-500 text-sm">
    {(errors.passwordCheck as FieldError).message}
  </div>
)}

      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="text-sm underline"
      >
        {showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
      </button>

      <button
        onClick={onNext}
        disabled={
          !password || !passwordCheck || !!errors.password || !!errors.passwordCheck
        }
        className="w-full bg-pink-500 text-white py-2 rounded disabled:bg-gray-400"
      >
        다음
      </button>
    </div>
  );
};

export default SignupStepPassword;
