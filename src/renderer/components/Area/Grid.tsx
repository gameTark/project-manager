import { ReactNode } from "react";
import { Box } from "@radix-ui/themes";

export const GridLayout = (props: { children: ReactNode }) => {
  return (
    <Box height="100%" width="100%" position="relative">
      <Box position="absolute" inset="0 80% 0 0">
        {props.children}
      </Box>
      <Box position="absolute" inset="0 0 0 20%">
        {props.children}
      </Box>
    </Box>
  );
};
