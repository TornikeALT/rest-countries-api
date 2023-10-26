import { Outlet, useLocation } from "react-router-dom";
import Mode from "../components/Mode";
import Countries from "../components/Countries";
import { useTheme } from "../context/ThemeContext";

function RootLayout() {
    const location = useLocation();
    const { theme, toggleTheme } = useTheme()

    const styles = theme ? 'dark' : 'light'
    return (
        <>
            <Mode />
            <main className={styles}>
                {location.pathname === '/' && <Countries />}
                <Outlet />
            </main>
        </>
    );
}

export default RootLayout;