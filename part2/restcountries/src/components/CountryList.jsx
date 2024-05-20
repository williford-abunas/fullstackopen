/* eslint-disable react/prop-types */
import Country from './Country'
import { useState } from 'react'

const CountryList = ({ country }) => {
  const [isShown, setIsShown] = useState(false)
  const handleToggle = () => setIsShown((prev) => !prev)

  return (
    <>
      <li key={country.name.common}>{country.name.common}</li>
      <button onClick={handleToggle}>{isShown ? 'hide' : 'show'}</button>
      <>{isShown ? <Country country={country} /> : ''}</>
    </>
  )
}

export default CountryList
