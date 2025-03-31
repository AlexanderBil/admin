const cleanObject = (obj = {}) => {
  Object.keys(obj).forEach(key => {
    if (!obj[key]) {
      delete obj[key]
    }
  })
  return obj
}

export default cleanObject;