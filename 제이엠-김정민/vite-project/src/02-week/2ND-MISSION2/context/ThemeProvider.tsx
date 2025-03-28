import { createContext, PropsWithChildren, useContext, useState } from "react";

export enum THEME{
    LIGHT = 'LIGHT',
    DRAK = 'DRAK',
}

type TTheme = THEME.LIGHT | THEME.DRAK;

interface IThemeContext{
    theme: TTheme;
    toggleTheme: () => void;
}
//타입으로 지정해도 상관 없음
// type TThemeContextAction = {
//     toggleTheme: () => void;
// };

//ThemeContext는 IThemeContext를 받을 수도 있고, undefined도 받을 수 있다.
export const ThemeContext = createContext<IThemeContext | undefined>(undefined); 

export const ThemeProvider = ({children} : PropsWithChildren) => {
    const [theme, setTheme] = useState<TTheme>(THEME.LIGHT);

    const toggleTheme = () => {
        setTheme((prevTheme): THEME =>
            prevTheme === THEME.LIGHT ? THEME.DRAK : THEME.LIGHT
        );
    };

    return (
        <ThemeContext.Provider value={{theme:theme, toggleTheme: toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
};


export const useTheme = () => {
    const context = useContext(ThemeContext);

    if(!context){
        throw Error('useTheme must be used within a ThemeProvider');
    }

    return context;
}