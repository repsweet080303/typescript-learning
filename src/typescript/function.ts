type myArray = number[] | string;

function map<Input, Output>(
  arr: Input[],
  fn: (arr: Input) => Output
): Output[] {
  return arr.map(fn);
}

function longest<Type extends { length: number }>(a: Type, b: Type) {
  if (a.length >= b.length) {
    return a;
  } else {
    return b;
  }
}

const notOk = longest<myArray>([3, 4], "dsd");

console.log(notOk);