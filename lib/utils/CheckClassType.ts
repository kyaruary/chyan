export function isClass(fn: any) {
  const str = fn.toString();
  return str.slice(0, 5) === "class";
}
