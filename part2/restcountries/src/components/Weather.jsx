import api from '../apiClient'
import { useEffect, useState } from 'react'

const Weather = ({ country }) => {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const kelvinToCelsius = (deg) => {
    return (deg - 273.15).toFixed(2)
  }

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await api.getWeather(country)
        setWeather(response)
      } catch (error) {
        setError('Failed to fetch weather data')
      } finally {
        setLoading(false)
      }
    }
    fetchWeather()
  }, [country])

  if (loading) {
    return <p>Loading weather data...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  if (!weather) {
    return <p>No weather data available</p>
  }

  return (
    <>
      <h2>Weather in {country.name.common}</h2>
      <p>Temp: {kelvinToCelsius(weather.main.temp)}&deg;C</p>
      <img
        src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
        alt="Weather Icon"
        style={{ height: '50px' }}
      />
      <p>Wind: {weather.wind.speed} m/s</p>
    </>
  )
}

export default Weather
