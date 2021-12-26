import './App.scss';
import {useEffect, useState} from "react";

function App() {
    const [countriesData, setCountriesData] = useState([])
    const [filteredCountriesData, setFilteredCountriesData] = useState([])

    let countries = filteredCountriesData.map(country => (
        <div>
            <img src={country.flag} />
            <div>
                <h2>{country.name}</h2>
                <p><span>Population:</span> {country.population}</p>
                <p><span>Region:</span> {country.region}</p>
                <p><span>Capital:</span> {country.capital}</p>
            </div>
        </div>
    ))

    useEffect(() => {
        fetch('https://restcountries.com/v2/all')
            .then(response => response.json())
            .then(data => {
                setCountriesData(data)
                setFilteredCountriesData(data)
            });
    }, [])

    return (
        <div className="App">
            <header className="flex">
                <p>Where in the world?</p>
                <div className="flex">
                    <img src='./sleep-mode.png' alt="dark mode" />
                    <p>Dark Mode</p>
                </div>
            </header>

            <main className="flex-col">
                <div>
                    <input />

                    <select>
                        <option>Filter by Region</option>
                    </select>
                </div>

                <section className="flex">
                    {countries}
                </section>
            </main>
        </div>
    );
}

export default App;
