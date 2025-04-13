import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { postSignup } from "../apis/auth";
import { useState } from "react";
import SignupStepEmail from "../signup/SignupStepEmail";
import SignupStepPassword from "../signup/SignupStepPassword";
import SignupStepProfile from "../signup/SignupStepProfile";

const schema = z.object({
    email: z.string().email({message: "올바른 이메일 형식이 아닙니다."}),
    password: z.string().min(8, {
        message: "비밀번호는 8자 이상이어야 합니다.",
    }).max(20, {
        message: "비밀번호는 20자 이하여야 합니다.",
    }),
    passwordCheck: z.string().min(8, {
        message: "비밀번호는 8자 이상이어야 합니다.",
    }).max(20, {
        message: "비밀번호는 20자 이하여야 합니다.",
    }),
    name: z.string().min(1, {message: "이름을 입력해주세요."}),
}).refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ['passwordCheck'],
});

export type FormFields = z.infer<typeof schema>;

const SignupPage = () => {
    const [step, setStep] = useState(1);

    const {register,
        handleSubmit,
        formState: {errors},
        watch,
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

    const email = watch("email");
    const password = watch("password");
    const passwordCheck = watch("passwordCheck");
    const name = watch("name");

    const onSubmit:SubmitHandler<FormFields> = async(data) => {
        console.log(data);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {passwordCheck, ...singupData} = data;

        const response = await postSignup(singupData);

        console.log(response);
    };

    return (
        <div className='flex flex-col items-center justify-center
        h-full gap-4'>
            {step === 1 && (
        <SignupStepEmail
          email={email}
          error={errors.email?.message}
          register={register}
          onNext={() => setStep(2)}
        />
      )}
      {step === 2 && (
        <SignupStepPassword
          password={password}
          passwordCheck={passwordCheck}
          errors={errors}
          register={register}
          onNext={() => setStep(3)}
        />
      )}
      {step === 3 && (
        <SignupStepProfile
          name={name}
          register={register}
          error={errors.name?.message}
          onSubmit={handleSubmit(onSubmit)}
        />
      )}
        </div>
    );
};

export default SignupPage;