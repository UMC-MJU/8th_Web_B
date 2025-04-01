import clsx from "clsx";
import { THEME, useTheme } from "./context/ThemeProvider";

export default function ThemeContent() {
  const { theme } = useTheme();

  const isLightMode = theme === THEME.LIGHT;

  return (
    <div
      className={clsx("p=4 h-dvh", isLightMode ? "bg-white" : "bg-gray-800")}
    >
      <h1
        className={clsx(
          "text-wxl font-bold",
          isLightMode ? "text-black" : "text-white"
        )}
      >
        !useContext 다크/라이트 모드 구현!
      </h1>
      <p className={clsx("mt-2", isLightMode ? "text-black" : "text-white")}>
        안녕하세요 두현우입니다. 너무 졸려요.
      </p>
    </div>
  );
}
