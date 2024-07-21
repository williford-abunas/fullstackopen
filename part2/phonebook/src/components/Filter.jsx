// eslint-disable-next-line react/prop-types
const Filter = ({ handleSearch, filter }) => {
  return (
    <div>
      filter shown with{' '}
      <input name="search" onChange={handleSearch} value={filter} />
    </div>
  )
}

export default Filter
