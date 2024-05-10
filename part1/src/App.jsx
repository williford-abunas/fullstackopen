/* eslint-disable react/prop-types */
const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  const newObj = { part1, exercises1, part2, exercises2, part3, exercises3 }
  console.log(newObj)
  const exObj = { exercises1, exercises2, exercises3 }

  return (
    <div>
      <Header course={course} />
      <Content newObj={newObj} />
      <Total exObj={exObj} />
    </div>
  )
}

const Header = (props) => {
  return <h1>{props.course}</h1>
}

const Content = (props) => {
  return (
    <>
      <Part title={props.newObj.part1} number={props.newObj.exercises1} />
      <Part title={props.newObj.part2} number={props.newObj.exercises2} />
      <Part title={props.newObj.part3} number={props.newObj.exercises3} />
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
  return (
    <p>
      Number of exercises{' '}
      {props.exObj.exercises1 + props.exObj.exercises2 + props.exObj.exercises3}
    </p>
  )
}

export default App
