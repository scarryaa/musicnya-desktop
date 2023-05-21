export const isArray = <T>(input: any | any[]): input is T[] =>
  input.constructor === Array;
