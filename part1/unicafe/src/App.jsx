/* eslint-disable react/prop-types */
import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClick = (e) => {
    if (e.target.textContent === 'good') {
      setGood((prev) => prev + 1)
    }

    if (e.target.textContent === 'neutral') {
      setNeutral((prev) => prev + 1)
    }

    if (e.target.textContent === 'bad') {
      setBad((prev) => prev + 1)
    }
  }
  console.log(good, neutral, bad)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button text="good" handleClick={handleClick} />
      <Button text="neutral" handleClick={handleClick} />
      <Button text="bad" handleClick={handleClick} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>
}

const Statistics = (props) => {
  const { good, neutral, bad } = props
  const total = good + neutral + bad
  return (
    <>
      <h1>Statistics</h1>
      {total === 0 ? (
        <p>No feedback given</p>
      ) : (
        <table>
          <tbody>
            {good ? <StatisticLine text="good" value={good} /> : ''}
            {neutral ? <StatisticLine text="neutral" value={neutral} /> : ''}
            {bad ? <StatisticLine text="bad" value={bad} /> : ''}
            <StatisticLine text="total" value={total} />
            <StatisticLine text="average" value={(good - bad) / total} />
            <StatisticLine
              text="positives"
              value={(good / total) * 100 + ` %`}
            />
          </tbody>
        </table>
      )}
    </>
  )
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>
        {`${props.text} `}
        {props.value}
      </td>
    </tr>
  )
}

export default App
