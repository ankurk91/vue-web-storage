const parseJSON = <T extends any>(value: string): T | string => {
  try {
    return JSON.parse(value);
  } catch (e)  /*istanbul ignore next*/ {
    console.error(e);
    return value;
  }
};

const arrayify = (item: any | []): any[] => {
  return item instanceof Array ? item : [item];
};

export { parseJSON, arrayify }
