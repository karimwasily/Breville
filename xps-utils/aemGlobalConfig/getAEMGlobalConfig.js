/**
 * retrieve aem config data which is available on each page on the header element as data atributes
 * @returns {object}
 */
export const getAEMGlobalConfig = () => {
  const elem = document.getElementById( 'aemConfig' );
  return elem?.dataset ? { ...elem.dataset } : {};
}