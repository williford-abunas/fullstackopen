import { useState, useEffect } from 'react'
import Country from './components/Country'
import CountryList from './components/CountryList'
import api from './apiClient'

function App() {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState(null)

  useEffect(() => {
    const fetchCountries = async () => {
      const countries = await api.getCountries()
      setCountries(countries)
    }
    fetchCountries()
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
