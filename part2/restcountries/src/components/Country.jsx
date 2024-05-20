/* eslint-disable react/prop-types */
import Weather from './Weather'

const Country = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <img src={country.flags.png} />
      <Weather country={country} />
    </div>
  )
}

export default Country
