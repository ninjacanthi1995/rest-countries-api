import '../App.scss';
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

function Home() {
    const [countriesData, setCountriesData] = useState([])
    const [filteredCountriesData, setFilteredCountriesData] = useState([])
    const navigate = useNavigate();

    let countries = filteredCountriesData.map(country => (
        <div onClick={() => navigate(`/${country.alpha3Code}`)}>
            <img src={country.flag} alt="flag" />
            <div>
                <h2>{country.name}</h2>
                <p><span>Population:</span> {country.population}</p>
                <p><span>Region:</span> {country.region}</p>
                <p><span>Capital:</span> {country.capital}</p>
            </div>
        </div>
    ))

    const search = (e) => {
        e.preventDefault();
        let value = document.getElementById("search-input").value.toLowerCase();
        setFilteredCountriesData(countriesData.filter(country => country.name.toLowerCase().includes(value)))
    }

    const filter = (e) => {
        let region = e.target.value;
        if (region !== 'all') setFilteredCountriesData(countriesData.filter(country => country.region === region))
    }

    useEffect(() => {
        fetch('https://restcountries.com/v2/all')
            .then(response => response.json())
            .then(data => {
                setCountriesData(data)
                setFilteredCountriesData(data)
            });
    }, [])

    return (
        <div className="home flex-col" role="landmark">
            <div className="flex-col" role="search">
                <form onSubmit={search}>
                    <input id="search-input" type="search" placeholder="&#61442;    Search for a country..." />
                </form>

                <select onChange={filter} aria-label="region">
                    <option value="all">Filter by Region</option>
                    <option value="Africa">Africa</option>
                    <option value="Americas">America</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="Oceania">Oceania</option>
                </select>
            </div>

            <section className="flex">
                {countries}
            </section>
        </div>
    );
}

export default Home;
