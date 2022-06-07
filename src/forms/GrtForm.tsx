import { Paper } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { CreateFormContext } from "../contexts/FormContext";
import { whitespaceOnlygGen } from "../utils/dummyDataGenerators";

export interface IGrtForm {
  "record-type": string;
  "group-id": string;
  "transaction-count": string;
  "record-count": string;
  "currency-indicator": string;
  "total-monetary-value": string;
}

export const initGrtForm = {
  "record-type": "GRT",
  "group-id": "",
  "transaction-count": "",
  "record-count": "",
  "currency-indicator": whitespaceOnlygGen(3),
  "total-monetary-value": whitespaceOnlygGen(10),
};

interface GrtFormProps {
  groupId: number;
  transactionCount: number;
  recordCount: number;
}

const GrtForm = ({ groupId, transactionCount, recordCount }: GrtFormProps) => {
  const { handleUpdateGrtForm } = useContext(CreateFormContext);
  useEffect(() => {
    const updateState = () => {
      handleUpdateGrtForm({
        ...initGrtForm,
        "group-id": ("" + groupId).padStart(5, "0"),
        "transaction-count": ("" + transactionCount).padStart(8, "0"),
        "record-count": ("" + recordCount).padStart(8, "0"),
      });
    };
    updateState();
  }, [groupId, transactionCount, recordCount, handleUpdateGrtForm]);
  return (
    <Paper elevation={3}>{`Group Trailer for group: ${groupId}, Total Transactions: ${transactionCount}, Total Records: ${recordCount} `}</Paper>
  );
};

export default GrtForm;
