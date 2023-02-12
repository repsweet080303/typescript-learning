function sumMatrix(array: number[][]) {
  let sum = 0;

  for (let i = 0; i < array.length; i++) {
    console.log(array[i]);
    let currentArray = array[i];
    for (let j = 0; j < currentArray.length; j++) {
      sum += currentArray[j];
    }
  }
  return sum;
}

console.log(
  sumMatrix([
    [2, 3, 2],
    [8, 5, 8],
    [10, 12],
  ])
);
