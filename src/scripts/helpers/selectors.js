/**
 * Select one element
 * @param {String} selectElement - The name class of the element to select
 * @returns {Element} Element in DOM
 */
const querySelectorElement = (selectElement) => document.querySelector(selectElement);

/**
 * Select list element
 * @param {String} selectElement - The name class of the element to select
 * @returns {NodeList} List element in DOM
 */
const querySelectorAllElement = (selectElement) => document.querySelectorAll(selectElement);

export { querySelectorElement, querySelectorAllElement };
