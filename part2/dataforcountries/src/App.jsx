import { useState, useEffect } from 'react'

import axios from 'axios'

const api_key = import.meta.env.VITE_SOME_KEY

const Countries = ({countries}) => {
  const [country, setCountry] = useState(null) 
  if (country === null) {
    return (
      <div>
        {countries.map(country => <div key={country.name.common}>{country.name.common} <button type='submit' onClick={() => setCountry(country)}>Show</button></div>)}
      </div>
    )
  } else {
    return (
      <div>
        <Country country={country}></Country>
      </div>
    )
  }
}

const Country = ({country}) => {
  const [city, setCity] = useState(null)
  const [weather, setWeather] = useState(null)
  useEffect(() => {
    axios
      .get(`http://api.openweathermap.org/geo/1.0/direct?q=${country.capital}&limit=1&appid=${api_key}`)
      .then(response => {
        setCity(response.data[0])
      })
  }, [country])
  
  useEffect(() => {
    if (city) {
      axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${api_key}`)
      .then(response => {
        console.log(response.data)
        setWeather(response.data)
      })
    }
  }, [city])

  return (
    <div>
      <h1>
        {country.name.common}
      </h1>
      <div>Capital {country.capital}</div>
      <div>Area {country.area}</div>
      <h2>
        Languages
      </h2>
      <ul>
        {Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}
      </ul>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="150" />
      <h2>Weather in {country.capital}</h2>
      {weather ? (
      <div>
        <div>Temperature: {(weather.main.temp - 273.15).toFixed(2)} °C</div>
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={`Weather icon of ${country.capital}`} width="150" />
        <div>Wind: {weather.wind.speed} m/s</div>
      </div>
      ) : (
      <div>Loading weather...</div>
      )}
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([]) 
  const [filter, setFilter] = useState("") 

  const showCountries = (countries) => {
    const len = countries.length
    console.log(len)
    if (len > 10) {
      return <div>Too many matches, specify another filter</div>
    } else if (len == 1) {
      return <Country country={countries[0]}></Country>
    } else if (1 < len <= 1) {
      return <Countries countries={countries}></Countries>
    } else {
      return null
    }
  }

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        setCountries(response.data)
      })
  }, [])
  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <div>find countries <input value={filter} onChange={(event) => setFilter(event.target.value)}></input></div>
      {filter === "" ? null : showCountries(filteredCountries)}
    </div>
  )
}

export default App