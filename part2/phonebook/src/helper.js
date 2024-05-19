const timeOut = (setfn) => {
  setTimeout(() => {
    setfn(null)
  }, 5000)
}

export default timeOut
