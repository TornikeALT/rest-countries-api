import axios from "axios";
import { useEffect, useState } from "react";
import '../index.css'
import search from '../images/search.png'
import { Link } from "react-router-dom";


function Countries() {
    const [data, setData] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState('')
    const [inputCountry, setInputCountry] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://restcountries.com/v3.1/all');
                return setData(response.data)
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchData()
    }, [])

    const handleRegionChange = (e) => {
        const region = e.target.value;
        setSelectedRegion(region)
    }


    const handleInputCountryChange = (e) => {
        const country = e.target.value;
        setInputCountry(country)
    }

    const filteredCountries = () => {
        let filteredData = data;
        if (selectedRegion) {
            filteredData = filteredData.filter((country) => country.region === selectedRegion)
        }
        if (inputCountry) {
            const lowerInput = inputCountry.toLowerCase();
            filteredData = filteredData.filter((country) => country.name.common.toLowerCase().includes(lowerInput));
        }
        return filteredData;
    }

    return (
        <div className="container">
            <div className="search_bar">
                <img src={search} alt="search glass" />
                <input type="text" placeholder="Search for a country ..." onChange={handleInputCountryChange} />
                <div>
                    <select name="region" id="region" className="filter_region" onChange={handleRegionChange}>
                        <option value="">Filter By Region</option>
                        <option value="Africa">Africa</option>
                        <option value="Americas">America</option>
                        <option value="Asia">Asia</option>
                        <option value="Europe">Europe</option>
                        <option value="Oceania">Oceania</option>
                    </select>
                </div>
            </div>
            <div className="wrapper">
                {filteredCountries().map((country, index) => {
                    return (
                        <div className="country" key={index}>
                            <Link to={`/country/${country.name.common}`}>
                                <img src={country.flags.png} alt="flag" />
                                <div className="content">
                                    <h3>{country.name.common}</h3>
                                    <div className="population">
                                        <h4>Population: </h4>
                                        <span>{country.population.toLocaleString()}</span>
                                    </div>
                                    <div className="region">
                                        <h4>Region: </h4>
                                        <span>{country.region}</span>
                                    </div>
                                    <div className="capital">
                                        <h4>Country: </h4>
                                        <span>{country.capital}</span>
                                    </div>
                                </div>
                            </Link>
                        </div>)

                })}

            </div>
        </div >
    );
}

export default Countries;
