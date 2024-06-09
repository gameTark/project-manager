import { AuthorSchema } from "./Author";

// import { Book } from 'schemas/src/generated/main/graphql'

export class BookSchema {
  public id: string;
  public title: string;

  constructor(value: { id: string; title: string }) {
    this.id = value.id;
    this.title = value.title;
  }

  async author() {
    return new AuthorSchema({
      id: "asdfsafdsdf",
      name: "asdfasdfdsdf",
      age: 100,
    });
  }
}
