/**
 * function validateNameEmpty
 * @param {String} value - value name input
 * @returns {Boolean} return true if value is empty
 */
const validateNameEmpty = (value) => {
  if (!value) {
    return true;
  }
  return false;
};

/**
 * function validateEmailRegex
 * @param {String} value - value email
 * @returns {Boolean} return true if value not match regex pattern
 */
const validateEmailRegex = (value) => {
  const validRegex = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;

  if (value.match(validRegex)) {
    return false;
  }
  return true;
};

export { validateEmailRegex, validateNameEmpty };
