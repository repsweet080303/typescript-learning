function myFunction(name: string | string[]) {
  if(Array.isArray(name)){
    name.forEach(e => console.log(`they are ${e}`))
  } else {
    console.log(`there is ${name}`);
  }
}

myFunction(['Hoa','Tien'])
myFunction('Minh')