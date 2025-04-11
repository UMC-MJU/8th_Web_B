import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSignup } from "../apis/auth";

const schema = z
  .object({
    email: z.string().email({
      message: "EmailError",
    }),

    password: z
      .string()
      .max(20, {
        message: "PasswordError",
      })
      .min(8, {
        message: "PasswordAtleast8words",
      }),

    name: z
      .string()
      .max(20, {
        message: "NameMax20words",
      })
      .min(1, { message: "EnterName" }),

    passwordCheck: z
      .string()
      .min(8, {
        message: "PasswordAtleast8words",
      })
      .max(20, {
        message: "PasswordMax20words",
      }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "PasswordDiscord",
    path: ["passwordCheck"],
  });

type FormFields = z.infer<typeof schema>;

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const { passwordCheck, ...rest } = data;
    void passwordCheck; // 일부러 사용하지 않는다는 의도 표시로 경고 방지
    const response = await postSignup(rest);
    console.log(response);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="flex flex-col gap-3">
        <input
          {...register("email")}
          type={"email"}
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
        ${errors?.email ? "border-red-500 bg-red-200" : "border-gray-300"}`}
          placeholder={"이메일"}
        />
        {errors.email && (
          <div className={"text-red-500 text-sm"}>{errors.email.message}</div>
        )}
        <input
          {...register("password")}
          type={"password"}
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
        ${errors?.password ? "border-red-500 bg-red-200" : "border-gray-300"}`}
          placeholder={"비밀번호"}
        />
        {errors.password && (
          <div className={"text-red-500 text-sm"}>
            {errors.password.message}
          </div>
        )}

        <input
          {...register("passwordCheck")}
          type={"password"}
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
        ${
          errors?.passwordCheck
            ? "border-red-500 bg-red-200"
            : "border-gray-300"
        }`}
          placeholder={"비밀번호 확인"}
        />
        {errors.passwordCheck && (
          <div className={"text-red-500 text-sm"}>
            {errors.passwordCheck.message}
          </div>
        )}

        <input
          {...register("name")}
          type={"name"}
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
        ${errors?.password ? "border-red-500 bg-red-200" : "border-gray-300"}`}
          placeholder={"이름"}
        />
        {errors.name && (
          <div className={"text-red-500 text-sm"}>{errors.name.message}</div>
        )}

        <button
          disabled={isSubmitting}
          type="button"
          onClick={handleSubmit(onSubmit)}
          className="w-full bg-amber-500 text-white py-3 rounded-lg font-medium hover:bg-amber-300 transition-colors cursor-pointer disabled:bg-gray-300"
        >
          SIGNUP
        </button>
      </div>
    </div>
  );
};

export default SignupPage;
