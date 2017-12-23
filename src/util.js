const parseJSON = (value) => {
  try {
    return JSON.parse(value);
  }
  catch (e)  /*istanbul ignore next*/ {
    console.error(e);
    return value
  }
};

export {parseJSON}
