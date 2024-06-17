import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Container } from "@radix-ui/themes";

import "@apollo/client";

import { PROTOCOLS } from "../constants/PROTOCOL";
import { GridLayout } from "./components/Area/Grid";
import { FileTree } from "./components/DirectoryViewer";
import { ProjectList } from "./components/Project/viewer";

const path = "C:/Users/araki/Develop/github/game-tark/project-manager";

const client = new ApolloClient({
  uri: `${PROTOCOLS.GQL}://`,
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Container width={"100vw"} height={"100vh"} maxWidth={"100vw"} maxHeight={"100vh"}>
        <GridLayout navigation={<FileTree path={path} />}>
          <ProjectList />
        </GridLayout>
      </Container>
    </ApolloProvider>
  );
}
