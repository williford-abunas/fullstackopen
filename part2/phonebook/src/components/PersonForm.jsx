/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
const PersonForm = ({ handleSubmit, newPerson, handleChange }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name:
        <input name="name" onChange={handleChange} value={newPerson.name} />
      </div>
      <div>
        number:
        <input name="number" onChange={handleChange} value={newPerson.number} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm
