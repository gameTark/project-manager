import * as path from "path";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronRightIcon, ChevronUpIcon, FileTextIcon } from "@radix-ui/react-icons";
import { ChevronDownIcon, Container, Flex, IconButton, ScrollArea } from "@radix-ui/themes";
import { styled } from "@stitches/react";
import { useQuery } from "@tanstack/react-query";

import { FileContext } from "./context";

const ListItem = styled("div", {
  "cursor": "pointer",
  "borderRadius": "5px",
  "padding": "2px 4px",
  "backgroundColor": "#fff",
  "&:hover": {
    backgroundColor: "#eee",
  },
});
const Name = styled("p", {
  overflow: "hidden",
  whiteSpace: "nowrap",
  wordBreak: "keep-all",
  textOverflow: "ellipsis",
  width: "100%",
  lineClamp: 1,
  margin: 0,
  padding: 0,
});
const StyledName = () => {
  return (
    <Name>
      <FileContext.Name />
    </Name>
  );
};

const cache = new Map<string, boolean>();
const Directory = () => {
  // 開いた状態でcacheさせる
  const targetPath = FileContext.uses.useGetPath();
  const [state, setState] = useState(cache.get(targetPath || "") || false);
  const changeState = useCallback(() => {
    setState((value) => !value);
  }, []);
  useEffect(() => {
    cache.set(targetPath || "", state);
  }, [state, targetPath]);
  return (
    <FileContext.is.Directory>
      <li>
        <ListItem>
          <Flex onClick={changeState} tabIndex={0} gap={"1"} align={"center"}>
            {state ? <ChevronDownIcon width={"16"} /> : <ChevronRightIcon width={"16"} />}
            <StyledName />
          </Flex>
        </ListItem>
        {state ? <Viewer /> : null}
      </li>
    </FileContext.is.Directory>
  );
};

const File = () => {
  return (
    <FileContext.is.File>
      <li>
        <ListItem>
          <Flex tabIndex={0} gap={"1"} align={"center"}>
            <FileTextIcon width={15} />
            <StyledName />
          </Flex>
        </ListItem>
      </li>
    </FileContext.is.File>
  );
};

const ViewerUnorderList = styled("ul", {
  listStyle: "none",
  margin: 0,
  padding: 0,
  marginLeft: "0.3em",
  paddingLeft: "0.3em",
  borderStyle: "solid",
  borderWidth: "0px",
  borderLeftWidth: "1px",
  borderColor: "#aaa",
});
const Viewer = (props: { path?: string }) => {
  return (
    <FileContext.Provider path={props.path}>
      <ViewerUnorderList>
        <FileContext.map.List>
          <Directory />
          <File />
        </FileContext.map.List>
      </ViewerUnorderList>
    </FileContext.Provider>
  );
};

const Header = styled("p", {
  width: "100%",
  border: "1px solid #aaa",
  borderRadius: "5px",
  padding: "2px 4px",
});
export const FileTree = (props: { path: string }) => {
  const [currentPath, setCurrentPath] = useState(props.path);
  const handleCurrentPage = useCallback(() => {
    const result = path.join(currentPath, "..");
    setCurrentPath(result);
  }, [currentPath]);

  return (
    <ScrollArea type="always" scrollbars="vertical" style={{ height: "100%" }}>
      <Container width={"100%"} pr={"3"} pl={"1"}>
        <Flex width={"100%"} justify={"center"} align={"center"} gap={"1"}>
          <Header>{currentPath}</Header>
          <IconButton onClick={handleCurrentPage}>
            <ChevronUpIcon />
          </IconButton>
        </Flex>
        <Viewer path={currentPath} />
      </Container>
    </ScrollArea>
  );
};
