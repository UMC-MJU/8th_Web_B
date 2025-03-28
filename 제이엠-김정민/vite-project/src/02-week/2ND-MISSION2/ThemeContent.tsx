import clsx from "clsx"; //clsx 라이브러리를 통해 조건부 렌더링이 가능하게 해줌
import { THEME, useTheme } from "./context/ThemeProvider";

export default function ThemeContent() {
    const { theme} = useTheme();

    const isLightMode = theme === THEME.LIGHT;

    return (
        <div className={clsx(
            'p-4',
            'h-[calc(100dvh-64px)]', //라이트 모드 버튼이 짤려서 ThemeContent 높이에서 Navbar 높이만큼 빼기
            isLightMode ? 'bg-white' : 'bg-gray-800'
        )}
        >
            <h1
                className={clsx(
                    'text-wxl font-bold',
                    isLightMode ? 'text-black' : 'text-white'
                )}
            >
                Theme Content
            </h1>

            <p className={clsx(
                'mt-2',
                isLightMode ? 'text-black' : 'text-white'
            )}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                Voluptatem quibusdam minima blanditiis ipsa veritatis neque 
                sequi quisquam doloribus iure odio architecto odit ex consectetur, 
                debitis explicabo ad quos eveniet. Pariatur.
            </p>
        </div>

    )
}