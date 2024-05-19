/* eslint-disable react/prop-types */
const Notification = ({ message, error }) => {
  if (message === null) {
    return null
  }

  const style = error
    ? { color: 'red', borderColor: 'red' }
    : { color: 'green', borderColor: 'green' }
  return (
    <div className="notification" style={style}>
      {message}
    </div>
  )
}

export default Notification
