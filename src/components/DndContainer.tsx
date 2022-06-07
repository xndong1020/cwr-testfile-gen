import { Box } from "@mui/material";
import React, { FC } from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../contants/ItemTypes";

export interface DndContainerProps {
  allowedDropEffect: string;
}

function selectBackgroundColor(isActive: boolean, canDrop: boolean) {
  if (isActive) {
    return "darkgreen";
  } else if (canDrop) {
    return "#eee";
  } else {
    return "#888";
  }
}

const DndContainer: FC<DndContainerProps> = ({ allowedDropEffect }) => {
  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.DNDTag,
      drop: () => ({
        name: `${allowedDropEffect} Dustbin`,
        allowedDropEffect,
      }),
      collect: (monitor: any) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [allowedDropEffect]
  );
  const isActive = canDrop && isOver;
  const backgroundColor: string = selectBackgroundColor(isActive, canDrop);
  return (
    <div
      ref={drop}
      style={{
        height: 200,
        backgroundColor: `${backgroundColor}`,
      }}
    >
      {`Works with ${allowedDropEffect} drop effect`}
      <br />
      <br />
      {isActive ? "Release to drop" : "Drag a tag here"}
    </div>
  );
};

export default DndContainer;
