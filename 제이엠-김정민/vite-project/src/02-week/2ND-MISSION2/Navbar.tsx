import clsx from 'clsx'; //clsx 라이브러리를 통해 조건부 렌더링이 가능하게 해줌
import { THEME, useTheme } from './context/ThemeProvider';
import ThemeToggleButton from './ThemeToggleButton';

export default function Navbar() {
    const {theme} = useTheme();

    const isLightMode = theme === THEME.LIGHT;

    console.log(theme);
    return (
        <nav 
            className={clsx(
            'p-4 w-full flex justify-end',
            isLightMode ? 'bg-white' : 'bg-gray-800'
        )}>
            <ThemeToggleButton />
        </nav>

    )
}
