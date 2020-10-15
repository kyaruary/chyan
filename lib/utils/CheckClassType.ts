export function isClass(fn: any) {
  try {
    const str = fn.toString();
    return str.slice(0, 5) === "class";
  } catch (e) {
    return false;
  }
}
