import { ChangeEvent, useEffect, useState } from "react";

interface UserFormProps<T> {
  initailValue: T; // {email: "", passowrd: ""}
  //값이 올바른지 검증하는 함수.
  validate: (values: T) => Record<keyof T, string>;
}

function useForm<T>({ initailValue, validate }: UserFormProps<T>) {
  const [values, setValues] = useState(initailValue);
  const [touched, setTouched] = useState<Record<string, boolean>>();
  const [errors, setErrors] = useState<Record<string, string>>();

  //사용자가 입력값을 바꿀 때 실행되는 함수다.
  const handleChange = (name: keyof T, text: string) => {
    setValues({
      ...values, // 불변성 유지(기존 값 유지)
      [name]: text,
    });
  };

  const handleBlur = (name: keyof T) => {
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  //이메일 인풋, 패스워드 인풋, 속성들을 가져오는 것
  const getInputProps = (name: keyof T) => {
    const value = values[name];
    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      handleChange(name, e.target.value);

    const onBlur = () => handleBlur(name);

    return { value, onChange, onBlur };
  };

  //values가 변경될 때마다 여러 검증 로직이 실행됨.
  // {email: ""}
  useEffect(() => {
    const newErrors = validate(values);
    setErrors(newErrors); // 오류 메시지 업데이트
  }, [validate, values]);

  return { values, errors, touched, getInputProps };
}

export default useForm;
