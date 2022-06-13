import React, { useContext } from "react";
import { CreateFormContext } from "../contexts/FormContext";

import { Expandable } from "../components/Expandable";
import InsForm from "../forms/InsForm";
import IndForm from "../forms/IndForm";
import AltForm from "../forms/AltForm";
import NwrForm from "../forms/NwrForm";
import { Box } from "@mui/material";

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

  return (
    <Box sx={{ border: "2px dashed green" }}>
      {!!nwr && (
        <Expandable
          title="Add NWR Record"
          name="nwrRecord"
          element={<NwrForm transactionSeq={0} recordSeq={1} />}
        />
      )}

      {!!alt && (
        <Expandable
          title="Add ALT Record"
          name="altRecord"
          element={<AltForm />}
        />
      )}

      {!!ind && (
        <Expandable
          title="Add IND Record"
          name="indRecord"
          element={<IndForm />}
        />
      )}

      {!!ins && (
        <Expandable
          title="Add INS Record"
          name="insRecord"
          element={<InsForm />}
        />
      )}
    </Box>
  );
};

export default TransactionContainer;
