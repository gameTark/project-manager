import { Container } from "@radix-ui/themes";

import { GridLayout } from "./components/Area/Grid";
import { FileTree } from "./components/DirectoryViewer";

const path = "C:/Users/araki/Develop/github/game-tark/project-manager";
export default function App() {
  window.mainProcess
    .gql(
      `
{
  projects {
    title
    icon {
      srcPath
    }
    contents {
      name
    }
    tags {
      name
    }
  }
}
  `,
    )
    .then((res) => console.log(res));
  return (
    <Container width={"100vw"} height={"100vh"} maxWidth={"100vw"} maxHeight={"100vh"}>
      <GridLayout>
        <FileTree path={path} />
      </GridLayout>
    </Container>
  );
}
