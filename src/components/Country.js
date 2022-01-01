import '../App.scss';
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

export default function Country() {
    const [country, setCountry] = useState({})
    const [currencies, setCurrencies] = useState([])
    const [languages, setLanguages] = useState([])
    const [borders, setBorders] = useState([])
    let { code } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://restcountries.com/v2/alpha/${code}`)
            .then(response => response.json())
            .then(data => {
                setCountry(data)
                setCurrencies(data.currencies.map(currency => currency.name))
                setLanguages(data.languages.map(lang => lang.name))

                fetch(`https://restcountries.com/v2/alpha?codes=${data.borders.join(',')}`)
                    .then(res => res.json())
                    .then(bordersData => setBorders(bordersData))
            });
    }, [code])

    return (
        <div className="country flex-col">
            <button className="flex" onClick={() => navigate(-1)}>
                <img src="./arrow_back_black.svg" id="back-icon" />
                Back
            </button>

            <main className="flex">
                <img src={country.flag} alt="flag"/>

                <section className="flex-col">
                    <h1>{country.name}</h1>

                    <div className="flex-col">
                        <div>
                            <p><span>Native Name:</span> {country.nativeName}</p>
                            <p><span>Population:</span> {country.population}</p>
                            <p><span>Region:</span> {country.region}</p>
                            <p><span>Sub Region:</span> {country.subregion}</p>
                            <p><span>Capital:</span> {country.capital}</p>
                        </div>

                        <div>
                            <p><span>Top Level Domain:</span> {country.topLevelDomain}</p>
                            <p><span>Currencies:</span> {currencies.join(', ')}</p>
                            <p><span>Languages:</span> {languages.join(', ')}</p>
                        </div>
                    </div>

                    <h3>Border Countries:</h3>
                    <div className="flex borders-container">
                        {borders.map(border => (
                            <button onClick={() => navigate(`/${border.alpha3Code}`)}>{border.name}</button>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}
