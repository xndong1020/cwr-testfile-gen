import React, { useContext } from "react";
import { CreateFormContext } from "../contexts/FormContext";

import { Expandable } from "../components/Expandable";
import InsForm from "../forms/InsForm";
import IndForm from "../forms/IndForm";
import AltForm from "../forms/AltForm";
import NwrForm from "../forms/NwrForm";
import { Box } from "@mui/material";
import IFormBase from "../forms/IFormBase";

interface ITransactionContainerProps {
  groupIndex: number;
  transactionIndex: number;
}

const TransactionContainer = ({
  groupIndex,
  transactionIndex,
}: ITransactionContainerProps) => {
  const { groups } = useContext(CreateFormContext);

  const currentTransaction = groups[groupIndex].transactions[transactionIndex];

  const { alt, nwr, ind, ins } = currentTransaction;

  const getRecordIndex = (recordName: string): number => {
    return Object.keys(currentTransaction).findIndex(
      (key) => key === recordName
    );
  };

  return (
    <Box sx={{ border: "2px dashed green" }}>
      {!!nwr && (
        <Expandable
          title="Add NWR Record"
          name="nwrRecord"
          element={
            <NwrForm
              transactionIndex={transactionIndex}
              recordIndex={getRecordIndex("nwr")}
            />
          }
        />
      )}

      {!!alt && (
        <Expandable
          title="Add ALT Record"
          name="altRecord"
          element={
            <AltForm
              transactionIndex={transactionIndex}
              recordIndex={getRecordIndex("alt")}
            />
          }
        />
      )}

      {!!ind && (
        <Expandable
          title="Add IND Record"
          name="indRecord"
          element={
            <IndForm
              transactionIndex={transactionIndex}
              recordIndex={getRecordIndex("ind")}
            />
          }
        />
      )}

      {!!ins && (
        <Expandable
          title="Add INS Record"
          name="insRecord"
          element={
            <InsForm
              transactionIndex={transactionIndex}
              recordIndex={getRecordIndex("ins")}
            />
          }
        />
      )}
    </Box>
  );
};

export default TransactionContainer;
