/*
  return object, where keys is argyments, and value is sended value
  example: node weathe.js -s Moscow
  =>
  { s: 'Moscow' }
*/
const getArgs = (args) => {
  const res = {};
  const [executor, file, ...rest] = args;

  rest.forEach((value, index, srcArray) => {
    if (value.charAt(0) === '-') {
      if (index == srcArray.length - 1) {
        res[ value.substring(1) ] = true;
      } else if (srcArray[index+1].charAt(0) !== '-') { 
        res[ value.substring(1) ] = srcArray[index+1];
      } else {
        res[ value.substring(1) ] = true;
      }

    }
  });

  return res;
};


export { getArgs };