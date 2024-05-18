const Persons = ({ person }) => {
  return (
    <p>
      {person.name} <span> {person.number}</span>
    </p>
  )
}

export default Persons
