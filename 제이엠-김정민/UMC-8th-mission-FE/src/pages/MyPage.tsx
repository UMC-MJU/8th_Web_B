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
            <div>{data.data?.name}님 환영합니다.</div>
            <h1>{data.data?.email}</h1>

            <button className=" bg-blue-600 rounded-sm hover:scale-90" 
            onClick={handleLogout}>로그아웃</button>
        </div>
    );
};

export default MyPage;
