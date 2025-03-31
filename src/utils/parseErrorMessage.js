const parseErrorMessage = ({ response = {}, message }) =>
  // eslint-disable-next-line no-mixed-operators
  response.data && response.data.message || message

export default parseErrorMessage;