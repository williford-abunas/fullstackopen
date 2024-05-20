import { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/Country'
import CountryList from './components/CountryList'

function App() {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState(null)

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then((response) => setCountries(response.data))
  }, [])

  if (!countries) {
    return <p>Loading...</p>
  }

  const handleChange = (e) => setFilter(e.target.value)

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  )

  const exactMatch = countries.find(
    (country) => country.name.common.toLowerCase() === filter.toLowerCase()
  )

  console.log(countries)
  return (
    <>
      <label htmlFor="search">Find countries</label>
      <input type="text" id="search" onChange={handleChange} />
      {filter && (
        <div>
          {exactMatch ? (
            <Country country={exactMatch} />
          ) : filteredCountries.length > 10 ? (
            <p>Too many countries, please refine your search</p>
          ) : (
            <ul>
              {filteredCountries.length > 0 ? (
                filteredCountries.map((country) => (
                  <CountryList key={country.cca3} country={country} />
                ))
              ) : (
                <li>No countries found</li>
              )}
            </ul>
          )}
        </div>
      )}
    </>
  )
}

export default App
