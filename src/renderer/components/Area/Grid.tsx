import { DragEventHandler, ReactNode, useRef, useState } from "react";
import { Box, ScrollArea } from "@radix-ui/themes";
import { styled } from "@stitches/react";
import { useThrottleFn } from "ahooks";

const Divider = styled("div", {
  "position": "absolute",
  "height": "100%",
  "cursor": "col-resize",
  "background": "#000",
  "opacity": 0,
  "transition": "200ms",
  "&:hover": {
    opacity: 1,
  },
});
export const GridLayout = (props: { navigation: ReactNode; children: ReactNode }) => {
  const [size, setSize] = useState(20);
  const left = 100 - size;
  const right = size;
  const refParent = useRef<HTMLDivElement>(null);

  const { run: handleDragDivider } = useThrottleFn<DragEventHandler<HTMLDivElement>>(
    (e) => {
      if (refParent.current == null) return;
      const target = (e.clientX / refParent.current.scrollWidth) * 100;
      if (target <= 4) return;
      setSize(Math.max(Math.min(target, 80), 10));
    },
    {
      wait: 60,
    },
  );

  return (
    <Box height="100%" width="100%" position="relative" style={{ zIndex: 0 }} ref={refParent}>
      <Box position="absolute" inset={`0 ${left}% 0 0`} p="1">
        <ScrollArea type="always" scrollbars="vertical" style={{ height: "100%" }}>
          {props.navigation}
        </ScrollArea>
      </Box>
      <Divider
        draggable
        style={{ inset: `0 calc(${left}% - 2px) 0 calc(${right}% - 2px)`, zIndex: 1 }}
        onDrag={handleDragDivider}
      />
      <Box position="absolute" inset={`0 0 0 ${right}%`}>
        <ScrollArea type="always" scrollbars="vertical" style={{ height: "100%" }}>
          {props.children}
        </ScrollArea>
      </Box>
    </Box>
  );
};
