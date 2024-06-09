import { BookSchema } from "./Book";

export class AuthorSchema {
  public id = "asdfasdf2134";
  public name = "23klsjflsjadf";
  public age = 10;
  constructor(value: {
    id: string;
    name: string;
    age: number;
  }) {
    this.id = value.id;
    this.name = value.name;
    this.age = value.age;
  }

  async books() {
    return [new BookSchema({
      id: 'asdfasdf',
      title: 'asfsadfsdaf',
    })];
  }
}
