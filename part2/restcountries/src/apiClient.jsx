/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-undef */
import axios from 'axios'

const APIkey = import.meta.env.VITE_WEATHER_API_KEY

const getCountries = async () => {
  const response = await axios.get(
    'https://studies.cs.helsinki.fi/restcountries/api/all'
  )

  return response.data
}

const getWeather = async (country) => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${APIkey}`
  )

  return response.data
}
export default { getCountries, getWeather }
