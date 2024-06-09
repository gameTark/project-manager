import { Button, Flex, Text } from "@radix-ui/themes";

import { getFileQuery } from "./queries/baseQuery";

const path = "C:\\\\Program Files\\\\Derivative\\\\TouchDesigner";

const Hoge = () => {
  getFileQuery({
    path: path,
  }).then((res) => console.log(res));
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
