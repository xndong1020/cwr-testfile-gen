import { style } from "@mui/system";
import React, { FC, useContext } from "react";
import { useDrag, DragSourceMonitor } from "react-dnd";
import { ItemTypes } from "../contants/ItemTypes";
import { CreateFormContext } from "../contexts/FormContext";

export interface DndTagProps {
  name: string;
}

interface DropResult {
  allowedDropEffect: string;
  dropEffect: string;
  name: string;
}

const DndTag: FC<DndTagProps> = ({ name }) => {
  const { handleSetRecordActive } = useContext(CreateFormContext);
  const [{ opacity }, drag] = useDrag(
    () => ({
      type: ItemTypes.DNDTag,
      item: { name },
      end(item, monitor) {
        const dropResult = monitor.getDropResult() as DropResult;
        if (item && dropResult) {
          const itemName = item.name;
          handleSetRecordActive(itemName);
        }
      },
      collect: (monitor: DragSourceMonitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [name]
  );

  return (
    <div
      ref={drag}
      style={{
        border: "1px dashed gray",
        backgroundColor: "white",
        padding: "0.5rem 1rem",
        marginRight: "1.5rem",
        marginBottom: "1.5rem",
        float: "left",
      }}
    >
      {name}
    </div>
  );
};

export default DndTag;
