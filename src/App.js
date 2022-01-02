import './App.scss';
import {Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import Country from "./components/Country";

function App() {
    const toggleDarkMode = () => {
        let darkMode = document.getElementsByClassName("App")[0];
        let darkModeIcon = document.getElementById("dark-mode-icon");
        let backIcon = document.getElementById("back-icon");

        if (darkMode.classList.contains("dark-mode")) {
            darkMode.classList.remove("dark-mode")
            darkModeIcon.src = "./dark_mode_black.svg";
            backIcon.src = "./arrow_back_black.svg";
        } else {
            darkMode.classList.add("dark-mode")
            darkModeIcon.src = "./dark_mode_white.svg";
            backIcon.src = "./arrow_back_white.svg";
        }
    }

    return (
        <div className="App flex-col" role="main">
            <header className="flex">
                <h1>Where in the world?</h1>
                <div className="flex" onClick={toggleDarkMode} role="dark-mode">
                    <img src='./dark_mode_black.svg' alt="dark mode" id="dark-mode-icon" />
                    <p>Dark Mode</p>
                </div>
            </header>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:code" element={<Country />} />
            </Routes>
        </div>
    )
}

export default App;
