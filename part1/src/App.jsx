/* eslint-disable react/prop-types */
const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10,
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7,
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14,
  }

  const total = part1.exercises + part2.exercises + part3.exercises

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3} />
      <Total total={total} />
    </div>
  )
}

const Header = (props) => {
  return <h1>{props.course}</h1>
}

const Content = (props) => {
  return (
    <>
      <Part title={props.part1.name} number={props.part1.exercises} />
      <Part title={props.part2.name} number={props.part2.exercises} />
      <Part title={props.part3.name} number={props.part3.exercises} />
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <p>
        {props.title} {props.number}
      </p>
    </>
  )
}

const Total = (props) => {
  return <p>Number of exercises {props.total}</p>
}

export default App
