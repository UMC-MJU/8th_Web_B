import { THEME, useTheme } from './context/ThemeProvider'
import clsx from 'clsx'; //clsx 라이브러리를 통해 조건부 렌더링이 가능하게 해줌

export default function ThemeToggleButton() {
    const {theme,toggleTheme} = useTheme();

    const isLightMode = theme === THEME.LIGHT

  return (
    <button onClick={toggleTheme}
        className={clsx('px-4 py-2 mt-4 rounded-md transition-all',{
            'bg-black text-white': !isLightMode,
            'bg-white text-black': isLightMode,
        })}
        >
    {/* vs코드에서 이모지 입력하려면: 윈도우 키 + .(마침표) */}
    {isLightMode ?  '🌛다크 모드' : '☀️라이트 모드'} 
    </button>
  );
}
