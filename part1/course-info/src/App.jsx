/* eslint-disable react/prop-types */
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
    ],
  }

  const total = course.parts.reduce((acc, cur) => acc + cur.exercises, 0)

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total total={total} />
    </div>
  )
}

const Header = (props) => {
  return <h1>{props.course.name}</h1>
}

const Content = (props) => {
  return (
    <>
      {props.course.parts.map((part, i) => {
        return <Part key={i} title={part.name} number={part.exercises} />
      })}
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
