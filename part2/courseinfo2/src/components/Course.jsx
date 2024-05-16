/* eslint-disable react/prop-types */
import Header from './Header.jsx'
import Content from './Content.jsx'
import Total from './Total.jsx'

const Course = ({ course }) => {
  const total = course.parts.reduce((acc, cur) => acc + cur.exercises, 0)
  console.log(course)
  return (
    <div>
      <h1>Web development curriculum</h1>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total total={total} />
    </div>
  )
}

export default Course
