import courses from './data'
import Course from './components/Course'

const App = () => {
  const [halfStack, Nodejs] = courses
  return (
    <div>
      <Course course={halfStack} />
      <Course course={Nodejs} />
    </div>
  )
}

export default App
