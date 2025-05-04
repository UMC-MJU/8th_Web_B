import { createContext, PropsWithChildren, useContext, useState } from "react";
import { RequestSigninDto } from "../types/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { postLogout, postSignin } from "../apis/auth";

interface AuthContextType {
    accessToken: string|null;
    refreshToken: string|null;
    login: (SignInData: RequestSigninDto) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
    accessToken: null,
    refreshToken: null,
    login: async() => {},
    logout: async() => {},
});

export const AuthProvider = ({children}:PropsWithChildren) => {
    const {getItem:getAccessTokenFromStoarge,
        setItem:setAccessTokenInStorage,
        removeItem:removeAccessTokenFromStoarge
    } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
    const {getItem:getRefreshTokenFromStoarge,
        setItem:setRefreshTokenInStoarge,
        removeItem:removeRefreshTokenFromStoarge
    } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

    const [accessToken, setAccessToken] = useState<string|null>(
        getAccessTokenFromStoarge(),
    );

    const [refreshToken, setRefreshToken] = useState<string|null>(
        getRefreshTokenFromStoarge(),
    );

    const login = async(signinData:RequestSigninDto) => {
        try{
            const {data} = await postSignin(signinData);

            console.log("로그인 응답 전체:", data);


        if(data){
            const newAccessToken = data.accessToken;
            const newRefreshToken = data.refreshToken;

            setAccessTokenInStorage(newAccessToken);
            setRefreshTokenInStoarge(newRefreshToken);

            setAccessToken(newAccessToken);
            setRefreshToken(newRefreshToken);

            console.log("저장된 accessToken", localStorage.getItem("accessToken"));
            alert("로그인 성공");
            window.location.href = "/my";
        }
        }catch(error) {
        console.error("로그인 오류", error);
        alert("로그인 실패");
        }
    };

    const logout = async() => {
        try{
            await postLogout();
            removeAccessTokenFromStoarge();
            removeRefreshTokenFromStoarge();

            setAccessToken(null);
            setRefreshToken(null);
            
            alert("로그아웃 성공");
        } catch(error) {
            console.error("로그아웃 오류", error);
            alert("로그아웃 실패");
        }
    };

    return(
        <AuthContext.Provider value={{accessToken, refreshToken, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("AuthContext를 찾을 수 없습니다.");
    }

    return context;
}