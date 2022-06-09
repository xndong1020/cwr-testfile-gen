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
  const { handleUpdateGrhForm } = useContext(CreateFormContext);

  useEffect(() => {
    const updateState = () => {
      handleUpdateGrhForm({
        ...initGrhForm,
        "group-id": ("" + groupId).padStart(5, "0"),
        "batch-request": ("" + batchRequest).padStart(10, "0"),
      });
    };
    updateState();
  }, [groupId, batchRequest, handleUpdateGrhForm]);

  return (
    <Paper
      elevation={3}
    >{`Group Header for group: ${groupId}, batch request: ${batchRequest}`}</Paper>
  );
};

export default GrhForm;
