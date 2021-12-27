import '../App.scss';
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

function Home() {
    const [countriesData, setCountriesData] = useState([])
    const [filteredCountriesData, setFilteredCountriesData] = useState([])

    let countries = filteredCountriesData.map(country => (
        <Link key={country.alpha3Code} to={`/${country.alpha3Code}`}>
            <img src={country.flag} />
            <div>
                <h2>{country.name}</h2>
                <p><span>Population:</span> {country.population}</p>
                <p><span>Region:</span> {country.region}</p>
                <p><span>Capital:</span> {country.capital}</p>
            </div>
        </Link>
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
        <div className="home flex-col">
            <div>
                <input />

                <select>
                    <option>Filter by Region</option>
                </select>
            </div>

            <section className="flex">
                {countries}
            </section>
        </div>
    );
}

export default Home;
