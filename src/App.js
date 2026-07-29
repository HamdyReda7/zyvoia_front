import { useContext, useEffect, useState } from "react";
import { apivalue } from "./Data/AllData";
import Login from "./Pages/auth/Login";
import "./theme.css";

function App() {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

    useEffect(() => {
        document.body.setAttribute("data-theme", theme);

        localStorage.setItem("theme", theme);
    }, [theme]);

    const data = useContext(apivalue);
    return (
        <div>
            <Login theme={theme} setTheme={setTheme} />{" "}
        </div>
    );
}

export default App;
