export default (array) => array.reduce((object, string) => {
  object[string] = string;
  return object;
}, {});
