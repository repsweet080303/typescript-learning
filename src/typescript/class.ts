class Animal {
  readonly name: string = "animal";
  foot: number;

  constructor(otherName?: string) {
    if (otherName !== undefined) {
      this.name = otherName;
    } else {
      this.name = "amal";
    }
  }
}

const rabit = new Animal();

