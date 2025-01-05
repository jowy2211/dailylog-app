/**
 * Daily Log Helper
 * ===
 * ### Accept Only Number on keypress
 * Prevent user to input other than number
 * @param {Event} evt - Event input
 */
export const onlyNumberOnKeypress = (event) => {
  const evt = event || window.event
  const charCode = evt.which ? evt.which : evt.keyCode
  if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
    evt.preventDefault()
  }
  return true
}

export const handleNumberInput = (event) => {
  const inputNumber = Number(event);

  if (inputNumber !== 'NaN') {
    return inputNumber;
  }
}