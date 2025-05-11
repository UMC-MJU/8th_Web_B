import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import useForm from "../hooks/useForm";
import { UserSigninInformation, validateSignin } from "../utils/validate";
import { Link, useNavigate } from "react-router-dom";
import { getMyInfo } from "../apis/auth";

const LoginPage = () => {
    const {login, accessToken} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const check = async () => {
          try {
            await getMyInfo();
            navigate("/");
          } catch {
            // 유효하지 않으면 stay (로그인 페이지 보이게 유지)
          }
        };
    
        if (accessToken) check();
      }, [accessToken]);

    const {values, errors, touched, getInputProps} = useForm<UserSigninInformation>({
        initialValue: {
            email: "",
            password: "",
        },
        validate: validateSignin,
    });

  const handleSubmit = async () => {
        await login(values);
    };

  const isDisabled = 
  Object.values(errors || {}).some((error) => error.length > 0) ||
  Object.values(values).some((value) => value === "");

    return (
        <div className='flex flex-col items-center justify-center
        h-full gap-4'>
            <div className='flex flex-col gap-3'>
                <input
                {...getInputProps("email")}
                name="email"
                className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
                    ${errors?.email && touched?.email ? "border-red-500 bg-red-200" : "border-gray-300"}`}
                type={"email"}
                placeholder={"이메일을 입력해주세요!"}
                />
                {errors?.email && touched?.email && (
                    <div className='text-red-500 text-sm'>{errors.email}
                </div>)}
                <input
                {...getInputProps("password")}
                className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
                    ${errors?.password && touched?.password ? "border-red-500 bg-red-200" : "border-gray-300"}`}
                type={"password"}
                placeholder={"비밀번호를 입력해주세요!"}
                />
                {errors?.password && touched?.password && (
                    <div className='text-red-500 text-sm'>{errors.password}
                </div>)}
                <button
                type='button' 
                onClick={handleSubmit} 
                disabled={isDisabled}
                className='w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300'
                >
                  로그인
                </button>
                {accessToken && (
                <Link
                to={"/my"}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
                >
                  마이 페이지
                </Link>
                )}
                <Link
                to={"/search"}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
                >
                  검색
                </Link>
            </div>
        </div>
    );
};

export default LoginPage;