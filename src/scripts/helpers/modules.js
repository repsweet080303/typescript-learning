/**
 * function changeBase64
 * @param {Object} file - file user uploaded
 * @return {Object} Promise - return resolve or reject
 */
 function changeBase64 (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
  });
}
export default changeBase64 ;
