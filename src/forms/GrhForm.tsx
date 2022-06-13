import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { CreateFormContext } from "../contexts/FormContext";
import { transactionType } from "../referenceTables/transactionType";
import { whitespaceOnlyGen } from "../utils/dummyDataGenerators";
import { transactionTypesKenGen } from "../utils/referenceTableKeyGenerator";
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
  "submission-distribution-type": whitespaceOnlyGen(2),
};

interface GrhFormProps {
  groupId: number;
  batchRequest: number;
}

const GrhForm = ({ groupId, batchRequest }: GrhFormProps) => {
  const { handleUpdateRecord } = useContext(CreateFormContext);
  const [form, setForm] = useState<IGrhForm>(initGrhForm);

  useEffect(() => {
    const updateState = () => {
      const newGrhForm = {
        ...form,
        "group-id": ("" + groupId).padStart(5, "0"),
        "batch-request": ("" + batchRequest).padStart(10, "0"),
      };
      handleUpdateRecord(newGrhForm);
    };
    updateState();
  }, [groupId, batchRequest, handleUpdateRecord, form["transaction-type"]]);

  const handleRadioButtonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prevState) => ({
      ...prevState,
      "transaction-type": e.target.value,
    }));
  };

  const recordTypes = Object.keys(transactionType);
  return (
    <Paper elevation={3}>
      <FormControl>
        <FormLabel id="record-type-label">Record Type</FormLabel>
        <RadioGroup
          row
          aria-labelledby="record-type-label"
          value={form["transaction-type"]}
          name="radio-buttons-group"
          onChange={handleRadioButtonChange}
        >
          {recordTypes.map((recordType, idx) => {
            return (
              <FormControlLabel
                value={recordType}
                control={<Radio />}
                label={recordType}
                key={idx}
              />
            );
          })}
        </RadioGroup>
      </FormControl>
      <br />
      {`Group Header for group: ${groupId + 1}, batch request: ${batchRequest}`}
    </Paper>
  );
};

export default GrhForm;
