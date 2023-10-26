import axios from "axios";
import { BsSearch } from 'react-icons/bs'
import { useEffect, useState } from "react";
import '../index.css'
import search from '../images/search.png'
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";


function Countries() {
    const [data, setData] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState('')
    const [inputCountry, setInputCountry] = useState('')
    const { theme, toggleTheme } = useTheme()

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

    const styles = theme ? 'half_dark' : 'light';
    const stylesDark = theme ? 'dark' : 'light'


    return (
        <div className={`container `}>
            <div className="search_bar_wrapper">
                <div className="search_bar">
                    <BsSearch />
                    <input type="text" placeholder="Search for a country ..." onChange={handleInputCountryChange} className={styles} />
                </div>
                <div>
                    <select name="region" id="region" className={`filter_region ${styles}`} onChange={handleRegionChange}>
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
                        <div className={`country ${styles}`} key={index}>
                            <Link to={`/country/${country.name.common}`} className={`${styles}`}>
                                <img src={country.flags.png} alt="flag" />
                                <div className={`${styles} content`}>
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
