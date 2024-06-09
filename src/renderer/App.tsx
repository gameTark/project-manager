import { Button, Flex, Text } from "@radix-ui/themes";

// import * as gql from "schemas/src/generated/renderer/gql";
// const path = "C:\\\\Program Files\\\\Derivative\\\\TouchDesigner\\\\bin";

const Hoge = () => {
  window.mainProcess
    .gql(
      `query GetBooks {
  books {
      title
      author {
        books {
          title
        }
      }
  }
}`,
    )
    .then((res) => console.log(res.data));
  // console.log(path);
  // window.mainProcess
  //   .gql(
  //     `{ file(path: "${path}") {
  //   type
  //   updatedAt
  //   path
  // } }`,
  //   )
  //   .then((res) => console.log(res));
  return <>hoge</>;
};

export default function App() {
  return (
    <Flex direction="column" gap="2">
      <Hoge />
      <Text>Hello from Radix Themes :)</Text>
      <Button>Let's go</Button>
    </Flex>
  );
}
