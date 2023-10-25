import { Outlet, useLocation } from "react-router-dom";
import Mode from "../components/Mode";
import Countries from "../components/Countries";

function RootLayout() {
    const location = useLocation()
    return (
        <>
            <Mode />
            <main>
                {location.pathname === '/' && <Countries />}
                <Outlet />
            </main>
        </>
    );
}

export default RootLayout;