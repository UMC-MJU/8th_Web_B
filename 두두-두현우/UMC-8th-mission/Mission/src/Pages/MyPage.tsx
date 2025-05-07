import { useEffect, useState } from "react";
import { ResponseMyInfoDto } from "../types/auth";
import { getMyInfo } from "../apis/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [data, setData] = useState<ResponseMyInfoDto>([]);

  useEffect(() => {
    const getData = async () => {
      const response = await getMyInfo();
      console.log(response);

      setData(response);
    };

    getData();
  }, []);

  console.log(data.data?.name);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="flex-1 pt-20">
      <div>{data.data?.name}Page</div>
      <img src={data.data?.avatar as string} alt={"GoogleLogo"} />
      <h1>{data.data?.email}</h1>

      <button
        className="cursor-pointer bg-blue-600 rounded-sm p-5 hover:scale-90"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default MyPage;
