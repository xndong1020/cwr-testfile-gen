import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Button,
} from "@mui/material";
import React, { useState, useCallback, useContext } from "react";
import { IndFormConfig } from "../configurations/IndFormConfig";
import { CreateFormContext } from "../contexts/FormContext";
import { numericOnlyGen } from "../utils/dummyDataGenerators";
import { instrumentsKenGen } from "../utils/referenceTableKeyGenerator";

export interface IIndForm {
  "record-prefix": string;
  "instrument-code": string;
  "numbers-of-players": string;
}

export const initIndForm = {
  "record-prefix": "IND",
  "instrument-code": "",
  "numbers-of-players": "",
};

const IndForm = () => {
  const [indForm, setForm] = useState<IIndForm>(initIndForm);
  const { handleUpdateIndForm } = useContext(CreateFormContext);
  
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { id, value } = e.target;
      setForm((prev) => {
        return {
          ...prev,
          [id]: value,
        };
      });
    },
    []
  );
  const handleGenerateInd = () => {
    const newIndForm = {
      "record-prefix":
        "IND" + numericOnlyGen(IndFormConfig["record-prefix"].length - 3),
      "instrument-code": instrumentsKenGen(),
      "numbers-of-players": numericOnlyGen(
        IndFormConfig["numbers-of-players"].length
      ),
    };
    setForm(newIndForm);
    handleUpdateIndForm(newIndForm);
  };
  return (
    <>
      <FormControl>
        <InputLabel htmlFor="record-prefix">Record Prefix</InputLabel>
        <Input
          id="record-prefix"
          aria-describedby="record-prefix-helper-text"
          value={indForm["record-prefix"]}
          onChange={handleInputChange}
          inputProps={{ maxLength: IndFormConfig["record-prefix"].length }}
        />
        <FormHelperText id="record-prefix-helper-text">
          Indicates if the sender of the file is a society or a publisher.
          Values are PB = Publisher, SO = Society, AA = Administrative Agency,
          WR = Writer. If CWR Sender ID (IPNN) greater than 9 digits (without
          the 2 leading 0) then use Sender Type field to provide leading numbers
          of the CWR Sender ID. (Size: {IndFormConfig["record-prefix"].length})
        </FormHelperText>
      </FormControl>
      <br />

      <FormControl>
        <InputLabel htmlFor="instrument-code">instrument-code</InputLabel>
        <Input
          id="instrument-code"
          aria-describedby="instrument-code-helper-text"
          value={indForm["instrument-code"]}
          onChange={handleInputChange}
          inputProps={{ maxLength: IndFormConfig["instrument-code"].length }}
        />
        <FormHelperText id="instrument-code-helper-text">
          If Sender Type is equal to PB, AA, or WR, the sender must enter their
          assigned CWR IPI # in this field. These values reside in the CWR
          Sender ID and Codes Table. If Sender Type is equal to SO, the sending
          society must enter their Society Code. These values reside in the
          Society Code Table. If CWR Sender ID (IPNN) greater than 9 digits then
          use Sender ID to provide remaining numbers of the CWR Sender ID.
          (Size: {IndFormConfig["instrument-code"].length})
        </FormHelperText>
      </FormControl>
      <br />

      <FormControl>
        <InputLabel htmlFor="numbers-of-players">Numbers Of Players</InputLabel>
        <Input
          id="numbers-of-players"
          aria-describedby="numbers-of-players-helper-text"
          value={indForm["numbers-of-players"]}
          onChange={handleInputChange}
          inputProps={{ maxLength: IndFormConfig["numbers-of-players"].length }}
        />
        <FormHelperText id="numbers-of-players-helper-text">
          The name of the sender (publisher, society, agency). (Size:{" "}
          {IndFormConfig["numbers-of-players"].length})
        </FormHelperText>
      </FormControl>

      <br />
      <br />
      <Button
        variant="contained"
        color="success"
        onClick={() => handleGenerateInd()}
        sx={{
          paddingRight: 20,
        }}
      >
        Generate All Fields
      </Button>
    </>
  );
};

export default IndForm;
