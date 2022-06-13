import React, { useContext } from "react";
import { CreateFormContext } from "../contexts/FormContext";

import GrtForm from "../forms/GrtForm";
import GrhForm from "../forms/GrhForm";

import { Box } from "@mui/material";
import TransactionContainer from "./TransactionContainer";

interface IGroupContainerProps {
  groupIndex: number;
  totalGroups: number;
}

const GroupContainer = ({ groupIndex, totalGroups }: IGroupContainerProps) => {
  const { groups } = useContext(CreateFormContext);

  const { transactions } = groups[groupIndex];

  const recordCount = Object.entries(groups[groupIndex])
    .filter(([key, val]) => !!val && !["grh", "grt"].includes(key))
    .reduce((acc, val) => {
      acc += 1;
      return acc;
    }, 0);

  return (
    <Box sx={{ border: "2px dashed pink" }}>
      {!!totalGroups && (
        <GrhForm groupId={groupIndex} batchRequest={totalGroups} />
      )}

      {transactions &&
        transactions.length &&
        transactions.map((transaction, idx) => {
          return (
            <TransactionContainer
              groupIndex={groupIndex}
              transactionIndex={idx}
              key={idx}
            />
          );
        })}

      {!!totalGroups && (
        <GrtForm
          groupId={groupIndex}
          transactionCount={totalGroups}
          recordCount={recordCount}
        />
      )}
    </Box>
  );
};

export default GroupContainer;
