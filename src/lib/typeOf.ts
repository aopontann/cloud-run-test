const toString = Object.prototype.toString;

export const typeOf = (checkValue: any) => {
  return toString.call(checkValue).slice(8, -1).toLowerCase();
}