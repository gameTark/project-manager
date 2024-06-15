import { Container } from "@radix-ui/themes";

import { GridLayout } from "./components/Area/Grid";
import { FileTree } from "./components/DirectoryViewer";
import { ProjectList } from "./components/Project/viewer";

const path = "C:/Users/araki/Develop/github/game-tark/project-manager";
export default function App() {
  return (
    <Container width={"100vw"} height={"100vh"} maxWidth={"100vw"} maxHeight={"100vh"}>
      <GridLayout navigation={<FileTree path={path} />}>
        <ProjectList />
      </GridLayout>
    </Container>
  );
}
