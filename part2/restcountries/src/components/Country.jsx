/* eslint-disable react/prop-types */
const Country = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <img src={country.flags.png} />
    </div>
  )
}

export default Country
