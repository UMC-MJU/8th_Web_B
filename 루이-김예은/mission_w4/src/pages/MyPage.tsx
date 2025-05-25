import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import { ResponseMyInfoDto } from "../types/user";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import usePatchUser from "../hooks/mutations/usePatchUser";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";

const MyPage = () => {
  const navigate = useNavigate();
  const { accessToken, logout } = useAuth();
  // const [data, setData] = useState<ResponseMyInfoDto>([]);
  const { data: userData } = useGetMyInfo(accessToken);
  const { mutate: patchUserMutate } = usePatchUser();
  const [name, setName] = useState(userData?.data.name ?? "");

  // useEffect(() => {
  //   const getData = async () => {
  //     const response = await getMyInfo();
  //     console.log(response);

  //     setData(response);
  //   };

  //   getData();
  // }, []);

  useEffect(() => {
    if (!name && userData?.data.name) {
      setName(userData.data.name);
    }
  }, [userData?.data.name]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleUpdateName = () => {
    console.log("패치 직전 name", name);
    patchUserMutate({
      name,
      bio: userData?.data.bio ?? "",
      avatar: userData?.data.avatar ?? "",
    });
  };

  //console.log(data.data?.name);
  //console.log(userData?.data?.name);

  return (
    <div>
      {/* <h1>{data.data?.name}님 환영합니다.</h1> */}
      <h1>{userData?.data.name}님 환영합니다.</h1>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border border-gray-300 p-2"
      />
      <button
        onClick={handleUpdateName}
        className="bg-blue-500 text-white p-2 ml-2 cursor-pointer"
      >
        닉네임 변경
      </button>
      {/* <h1>{data.data?.email}</h1> */}
      <h1>{userData?.data.email}</h1>

      <button
        className="cursor-pointer bg-blue-300 rounded-sm p-5 hover:scale-90"
        onClick={handleLogout}
      >
        로그아웃
      </button>
    </div>
  );
};

export default MyPage;
