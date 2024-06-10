import { Container } from "@radix-ui/themes";

import { GridLayout } from "./components/Area/Grid";
import { FileTree } from "./components/DirectoryViewer";

const path = "C:/Users/araki/Spine";
export default function App() {
  return (
    <Container width={"100vw"} height={"100vh"} maxWidth={"100vw"} maxHeight={"100vh"}>
      <GridLayout>
        <FileTree path={path} />
      </GridLayout>
    </Container>
  );
}
