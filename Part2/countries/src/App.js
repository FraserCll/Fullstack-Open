import { useState, useEffect } from 'react'
import axios from 'axios'
const api_key = process.env.VITE_OPENWEATHER_KEY

const FindCountries = ({ handleFindCountries }) => {
  return (
    <div>
    find countries <input type='text'
    onChange={handleFindCountries} />
    </div>
  )
}

// Display countries with name containing term 'search'
const Countries = ({ countries, search, buttonCountryData }) => {
  let singleCountry = null
  const countriesToShow = search
  ? countries.filter(country => country.toLowerCase().includes(search))
  : countries

  console.log(countriesToShow.length)

  if ((10 < countriesToShow.length) && (search.length !== 0 )) {
    return (
      <p>
      Too many matches, specify another filter
      </p>
    )
  }
  else if ( ( countriesToShow.length > 1 ) && (countriesToShow.length < 11) ) {
    return (
      <ul>
        {countriesToShow.map((country, i) => 
          <li key={i}>
            {country}
            <button onClick={() => buttonCountryData(country)}>
              show 
            </button>
          </li>
        )}
      </ul>
    )
  }
  else if (countriesToShow.length === 1) {
    console.log(`Display single country data ${countriesToShow.toString().toLowerCase()}` )
    singleCountry = countriesToShow.toString().toLowerCase()

    return (
      <div>
        <CountryData singleCountry={singleCountry} api_key={api_key} />
      </div>
    )
  }
}

// Fetch and render the data for a single country
const CountryData = ({ singleCountry, api_key }) => {
  const [countryDetails, setCountryDetails] = useState({})
  const [weather, setWeather] = useState([])

    // Get data for specific country
    useEffect(() => {
      const url = 'https://studies.cs.helsinki.fi/restcountries/api/name/' + singleCountry
      if (singleCountry) {
        console.log('fetching country data...')
        axios
          .get(url)
          .then(response => {
              const object = {
                name: response.data.name.common,
                capital: response.data.capital,
                area: response.data.area,
                languages: Object.values(response.data.languages),
                flag: response.data.flags.svg,
                flagAlt: response.data.flags.alt
              }
              setCountryDetails(object)
          })
          .catch( error => {
            console.log('error fetching country')
          })

          axios
          .get(`https://api.openweathermap.org/data/2.5/weather?q=${countryDetails.capital}&appid=${api_key}`)
          .then(response => {
              console.log(response.data)
          })
          .catch( error => {
            console.log('error fetching weather')
          })
      }
    }, [singleCountry]
    )
    return(
      <div>
        <h2>
        {countryDetails.name}
        </h2>
        <p>
          capital {countryDetails.capital}
        </p>
        <p>
          area {countryDetails.area}
        </p>
        <b>
          languages:
        </b>
        <ul>
          {countryDetails.languages && countryDetails.languages.map((language, i) => 
            <li key={i}>
              {language}
            </li>
          )}
        </ul>
        <img
            src= {countryDetails.flag}
            alt= {countryDetails.flagAlt}
            role="img"
            height="150px"
        />
        <h2>
          Weather in {countryDetails.capital}
        </h2>
        <p>
          temperature
        </p>
        <p>
          wind
        </p>
      </div>
    )
}

const App = () => {
  const [countries, SetCountries] = useState([])
  const [search, setSearch] = useState('')
  const [buttonCountry, setButtonCountry] = useState(null)

  // Get the list of country (common) names
  useEffect(() => {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
            const fetchedCountries = response.data.map( country => country.name.common)
            SetCountries(fetchedCountries)
        })
        .catch( error => {
          console.log('error fetching countries')
        })
      }, []
  )

  const handleFindCountries = (event) => {
    setSearch(event.target.value.toLowerCase())
  }

  const buttonCountryData = (country) => {
    setButtonCountry(country)
  }

  return (
    <div>
      <FindCountries handleFindCountries={handleFindCountries} />
      <Countries countries={countries} search={search} buttonCountryData={buttonCountryData} />
      {buttonCountry && <CountryData singleCountry={buttonCountry} />}
    </div>
  )
}

export default App;
