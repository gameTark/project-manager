import { Button, Flex, Text } from "@radix-ui/themes";
import { type GetFileQuery, GetFileQueryVariables } from "schemas/src/generated/renderer/gql";


const query = `
query GetBooks {
  books {
      title
      author {
        books {
          title
        }
      }
  }
}
`
const getFileQuery = `
query GetFile($path: String!) {
  file(path: $path) {
    name
    path
    ls {
      name
      type
      updatedAt
      size
    }
  }
}
`
const path = "C:\\\\Program Files\\\\Derivative\\\\TouchDesigner";

const useGetFileQuery = () => {
  return window.mainProcess
    .gql<GetFileQuery, GetFileQueryVariables>(getFileQuery, {
      path: path,
    });

}
const Hoge = () => {
  window.mainProcess
    .gql(query)
    .then((res) => console.log(res.data))
    .catch((res) => console.log(res.data));
  const hoge = useGetFileQuery();
  hoge.then(res => {
    console.log(res.data.file?.ls);
  }) 
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
