import { Paper } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { CreateFormContext } from "../contexts/FormContext";
import { whitespaceOnlygGen } from "../utils/dummyDataGenerators";
import IFormBase from "./IFormBase";

export interface IGrhForm extends IFormBase {
  "record-type": string;
  "transaction-type": string;
  "group-id": string;
  "version-number": string;
  "batch-request": string;
  "submission-distribution-type": string;
}

export const initGrhForm = {
  type: "GRH",
  "record-type": "GRH",
  "transaction-type": "NWR",
  "group-id": "",
  "version-number": "02.10",
  "batch-request": "",
  "submission-distribution-type": whitespaceOnlygGen(2),
};

interface GrhFormProps {
  groupId: number;
  batchRequest: number;
}

const GrhForm = ({ groupId, batchRequest }: GrhFormProps) => {
  const { handleUpdateRecord } = useContext(CreateFormContext);

  useEffect(() => {
    const updateState = () => {
      const newGrhForm = {
        ...initGrhForm,
        "group-id": ("" + groupId).padStart(5, "0"),
        "batch-request": ("" + batchRequest).padStart(10, "0"),
      };
      handleUpdateRecord(newGrhForm);
    };
    updateState();
  }, [groupId, batchRequest, handleUpdateRecord]);

  return (
    <Paper
      elevation={3}
    >{`Group Header for group: ${groupId + 1}, batch request: ${batchRequest}`}</Paper>
  );
};

export default GrhForm;
