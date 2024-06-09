import { BookSchema } from "./schema/Book";
import { fileDataloader } from "./schema/File";

const resolver = {
  books() {
    return [new BookSchema({
      id: 'root',
      title: 'root title'
    })];
  },
  file: (args: { path: string }) => {
    return fileDataloader.load(args.path);
  },
  hello() {
    return "Hello world!";
  },
};
export default resolver;
