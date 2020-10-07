const parseJSON = <T extends any>(value: string | null): T | string | null => {
  if (value === null) {
    return value;
  }
  return JSON.parse(value);
};

const arrayify = (item: any | []): any[] => {
  return item instanceof Array ? item : [item];
};

export {parseJSON, arrayify}
