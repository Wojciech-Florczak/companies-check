export function sortASC(arr, key){
  return arr.sort((a, b) => a[key] < b[key] ? -1 : (a[key] > b[key] ? 1 : 0))
}

export function sortDESC(arr, key){
  return arr.sort((a, b) => a[key] > b[key] ? -1 : (a[key] < b[key] ? 1 : 0))
}