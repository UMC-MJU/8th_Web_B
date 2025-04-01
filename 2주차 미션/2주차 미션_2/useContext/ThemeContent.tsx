import clsx from "clsx";
import { THEME, useTheme } from "./context/ThemeProvider";

export default function ThemeContent() : React.ReactElement {
    const {theme} = useTheme();
        
    const isLightMode = theme === THEME.LIGHT;

    return ( <div
    className={clsx(
        'p-4', 'h-[calc(100dvh-64px)]',
        isLightMode ? 'bg-white' : 'bg-gray-800'
    )}
    >
    </div>
    );

}