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

export interface IAltForm {
  "record-prefix": string;
  "instrument-code": string;
  "numbers-of-players": string;
}

export const initAltForm = {
  "record-prefix": "ALT",
  "instrument-code": "",
  "numbers-of-players": "",
};

const IndForm = () => {
  const [altForm, setForm] = useState<IAltForm>(initAltForm);
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
        "ALT" + numericOnlyGen(IndFormConfig["record-prefix"].length - 3),
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
          value={altForm["record-prefix"]}
          onChange={handleInputChange}
          inputProps={{ maxLength: IndFormConfig["record-prefix"].length }}
        />
        <FormHelperText id="record-prefix-helper-text">
          Set Record Type = IND (Instrumentation Detail). (Size:{" "}
          {IndFormConfig["record-prefix"].length})
        </FormHelperText>
      </FormControl>
      <br />

      <FormControl>
        <InputLabel htmlFor="instrument-code">instrument-code</InputLabel>
        <Input
          id="instrument-code"
          aria-describedby="instrument-code-helper-text"
          value={altForm["instrument-code"]}
          onChange={handleInputChange}
          inputProps={{ maxLength: IndFormConfig["instrument-code"].length }}
        />
        <FormHelperText id="instrument-code-helper-text">
          Indicates the use of a specific instrument in this version of
          instrumentation. These values reside in the Instrument Table. (Size:{" "}
          {IndFormConfig["instrument-code"].length})
        </FormHelperText>
      </FormControl>
      <br />

      <FormControl>
        <InputLabel htmlFor="numbers-of-players">Numbers Of Players</InputLabel>
        <Input
          id="numbers-of-players"
          aria-describedby="numbers-of-players-helper-text"
          value={altForm["numbers-of-players"]}
          onChange={handleInputChange}
          inputProps={{ maxLength: IndFormConfig["numbers-of-players"].length }}
        />
        <FormHelperText id="numbers-of-players-helper-text">
          Indicates the number of players for the above instrument. (Size:{" "}
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