import { Paper } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { CreateFormContext } from "../contexts/FormContext";
import { whitespaceOnlyGen } from "../utils/dummyDataGenerators";
import IFormBase from "./IFormBase";

export interface IGrtForm extends IFormBase {
  "record-type": string;
  "group-id": string;
  "transaction-count": string;
  "record-count": string;
  "currency-indicator": string;
  "total-monetary-value": string;
}

export const initGrtForm = {
  type: "GRT",
  "record-type": "GRT",
  "group-id": "",
  "transaction-count": "",
  "record-count": "",
  "currency-indicator": whitespaceOnlyGen(3),
  "total-monetary-value": whitespaceOnlyGen(10),
};

interface GrtFormProps {
  groupId: number;
  transactionCount: number;
  recordCount: number;
}

const GrtForm = ({ groupId, transactionCount, recordCount }: GrtFormProps) => {
  const { handleUpdateRecord } = useContext(CreateFormContext);
  useEffect(() => {
    const updateState = () => {
      const newGrtForm = {
        ...initGrtForm,
        "group-id": ("" + groupId).padStart(5, "0"),
        "transaction-count": ("" + transactionCount).padStart(8, "0"),
        "record-count": ("" + recordCount).padStart(8, "0"),
      };
      handleUpdateRecord(newGrtForm);
    };
    updateState();
  }, [groupId, transactionCount, recordCount, handleUpdateRecord]);
  return (
    <Paper elevation={3}>{`Group Trailer for group: ${
      groupId + 1
    }, Total Transactions: ${transactionCount}, Total Records: ${recordCount} `}</Paper>
  );
};

export default GrtForm;
