import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { BsArrowLeft } from 'react-icons/bs'
import '../index.css'
import { useTheme } from "../context/ThemeContext";


function CountryDetail() {
    const { countryName } = useParams();
    const [country, setCountry] = useState(null);
    const [borderCountries, setBorderCountries] = useState([]);
    const navigate = useNavigate()
    const { theme, toggleTheme } = useTheme()
    const styles = theme ? 'dark' : 'light';
    const stylesHalfDark = theme ? 'half_dark' : 'light';


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
                setCountry(response.data[0]);
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchData();
    }, [countryName])



    useEffect(() => {
        if (country && Array.isArray(country.borders)) {
            const fetchBorderCountryNames = async () => {
                const borderNames = await Promise.all(country.borders.map(async (borderCode) => {
                    const borderResponse = await axios.get(`https://restcountries.com/v3.1/alpha/${borderCode}`);
                    return borderResponse.data[0].name.common;
                }));
                setBorderCountries(borderNames);
            };
            fetchBorderCountryNames();
        }
    }, [country]);




    if (!country) {
        return <div>Loading...</div>;
    }

    let borderContent;//for border

    if (Array.isArray(borderCountries) && borderCountries.length > 0) {
        borderContent = (
            <div className='detail_borders_wrapper'>
                <h4>Border Countries:</h4>
                {borderCountries.map((border, index) => {
                    return <Link to={`/country/${border}`} key={index} className={`detail_borders ${stylesHalfDark}`}>{border}</Link>
                })}
            </div>
        );
    } else {
        borderContent = (
            <div className={`detail_borders_wrapper ${stylesHalfDark}`}>
                <p>No borders available</p>
            </div>
        );
    }




    const currencyCode = Object.keys(country.currencies)[0]//vtreulobt pirvel currencis obieqts;

    let langugeSpoken = [];

    Object.entries(country.languages).forEach(([key, value]) => {
        langugeSpoken.push(value)
    });


    console.log(country);
    return (
        <div className={`container ${styles}`}>
            <button onClick={() => navigate(-1)} className={`back_btn ${stylesHalfDark}`}><BsArrowLeft size={20} /> Back</button>
            <div className="details_wrapper">
                <img src={country.flags.svg} alt={country.flags.alt} className="flag" />
                <div className="country_details">
                    <h2>{countryName}</h2>
                    <div className="cols">
                        <div className="left_col">

                            <div className="native_name">
                                <h4>Native Name:</h4>
                                <span>{country.altSpellings[1]}</span>
                            </div>
                            <div className="details_population">
                                <h4>Population:</h4>
                                <span> {country.population.toLocaleString()}</span>
                            </div>
                            <div className="region">
                                <h4>Region:</h4>
                                <span>  {country.region}</span>
                            </div>
                            <div className="subregion">
                                <h4>Subregion:</h4>
                                <span> {country.subregion}</span>
                            </div>
                            <div className="capital">
                                <h4>Capital:</h4>
                                <span>{country.capital}</span>
                            </div>
                        </div>
                        <div className="right_col">
                            <div className="domain">
                                <h4>Top Level Domain:</h4>
                                <span>{country.tld && country.tld[0]}</span>
                            </div>
                            <div className="currencies">
                                <h4>Currencies: </h4>
                                <span>  {country.currencies[currencyCode].name}</span>
                            </div>
                            <div className="languages">
                                <h4>Languages:</h4>
                                <span> {langugeSpoken.reverse().join(' ,')}</span>
                            </div>
                        </div>
                    </div>
                    {borderContent}
                </div>
            </div>
        </div>
    );
}

export default CountryDetail;
