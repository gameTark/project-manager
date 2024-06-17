import { Flex } from "@radix-ui/themes";
import { useGetIconQuery } from "schemas/src/generated/renderer/gql";

import { Icon } from "./context";

const Item = () => {
  const icon = Icon.use.useContext();
  return (
    <li>
      <Flex gap="4" align="center">
        <img src={icon?.srcPath} alt={icon?.name} height={30} />
        <p>{icon?.name}</p>
      </Flex>
    </li>
  );
};
const List = () => {
  const iconQuery = useGetIconQuery();
  return (
    <ul>
      {iconQuery.data?.icons.map((data) => {
        return (
          <Icon.Provider value={data} key={data?.id}>
            <Item />
          </Icon.Provider>
        );
      })}
    </ul>
  );
};

export const IconViwer = {
  List,
};
