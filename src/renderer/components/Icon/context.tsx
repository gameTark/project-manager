import { createContext, ReactNode, useContext } from "react";
import { RecursivePartial } from "@utils/type";
import { type Icon as TIcon } from "schemas/src/generated/renderer/gql";

const IconContext = createContext<RecursivePartial<TIcon> | null>(null);

const useIconContext = () => useContext(IconContext);

const Name = (): ReactNode => useIconContext()?.name;

const Image = (): ReactNode => {
  const iconContext = useIconContext();
  if (iconContext == null) return null;
  const { name, srcPath } = iconContext;
  if (name == null || srcPath == null) return null;
  return <img src={srcPath} alt={name} />;
};

export const Icon = {
  Name,
  Image,
  Provider: IconContext.Provider,
};
