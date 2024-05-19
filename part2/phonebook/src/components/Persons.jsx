/* eslint-disable react/prop-types */
const Persons = ({ person, handleDelete }) => {
  return (
    <>
      <p>
        {person.name} <span> {person.number}</span>
      </p>
      <button onClick={() => handleDelete(person.id)}>DELETE</button>
    </>
  )
}

export default Persons
