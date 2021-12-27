import '../App.scss';
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

export default function Country() {
    const [country, setCountry] = useState({})
    const [currencies, setCurrencies] = useState([])
    const [languages, setLanguages] = useState([])
    const [borders, setBorders] = useState([])
    let { code } = useParams();

    console.log(borders)

    useEffect(() => {
        fetch(`https://restcountries.com/v2/alpha/${code}`)
            .then(response => response.json())
            .then(data => {
                setCountry(data)
                setCurrencies(data.currencies.map(currency => currency.name))
                setLanguages(data.languages.map(lang => lang.name))
                //setBorders(data.borders)
                fetch(`https://restcountries.com/v2/alpha?codes=${data.borders.join(',')}`)
                    .then(res => res.json())
                    .then(bordersData => setBorders(bordersData))
            });
    }, [code])

    return (
        <div className="country">
            <button>Back</button>
            <img src={country.flag} />
            <h1>{country.name}</h1>
            <p><span>Native Name:</span> {country.nativeName}</p>
            <p><span>Population:</span> {country.population}</p>
            <p><span>Region:</span> {country.region}</p>
            <p><span>Sub Region:</span> {country.subregion}</p>
            <p><span>Capital:</span> {country.capital}</p>
            <br/>
            <p><span>Top Leval Domain:</span> {country.topLevelDomain}</p>
            <p><span>Currencies:</span> {currencies.join(', ')}</p>
            <p><span>Languages:</span> {languages.join(', ')}</p>
            <br/>
            <h2>Border Countries</h2>
            {borders.map(border => (
                <Link key={`${border.alpha3Code}-link`} to={`/${border.alpha3Code}`}><button>{border.name}</button></Link>
            ))}
        </div>
    );

    /*{borders.map(border => (
        <Link key={`${border}-link`} to={`/${border}`}><button>{border}</button></Link>
    ))}*/
}
