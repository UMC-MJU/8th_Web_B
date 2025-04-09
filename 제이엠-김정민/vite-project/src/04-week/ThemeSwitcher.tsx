import useLocalStorage from "../04-week/hooks/useLocalStorage";

const ThemeSwitcher = () => {
    const [theme, setTheme] = useLocalStorage("theme", "light");

    return (
        <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
            현재 테마: {theme}
        </button>
    );
};

export default ThemeSwitcher;