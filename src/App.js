import './App.scss';
import {Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import Country from "./components/Country";

function App() {
    return (
        <div className="App">
            <header className="flex">
                <p>Where in the world?</p>
                <div className="flex">
                    <img src='./sleep-mode.png' alt="dark mode" />
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
