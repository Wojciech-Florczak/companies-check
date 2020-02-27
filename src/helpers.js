export function sortASC(arr, key) {
  return arr.sort((a, b) => (a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0));
}

export function sortDESC(arr, key) {
  return arr.sort((a, b) => (a[key] > b[key] ? -1 : a[key] < b[key] ? 1 : 0));
}

export function sumUp(arr) {
  return arr.reduce((acc, currVal) => {
    currVal = parseFloat(currVal.value);
    return parseFloat((acc + currVal).toFixed(10));
  }, 0);
}

export function getLastMonth() {
  let date = new Date();
  let currentYear = date.getFullYear();
  let lastMonth = date
    .getMonth()
    .toString()
    .padStart(2, "0");
  let result = `${currentYear}-${lastMonth}`;
  return result;
}
