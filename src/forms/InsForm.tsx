import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Button,
} from "@mui/material";
import React, { useState, useCallback, useContext } from "react";
import { InsFormConfig } from "../configurations/InsFormConfig";
import { CreateFormContext } from "../contexts/FormContext";
import { numericOnlyGen } from "../utils/dummyDataGenerators";
import { standardInstrumentsKenGen } from "../utils/referenceTableKeyGenerator";
import IFormBase from "./IFormBase";

export interface IInsForm extends IFormBase {
  "record-prefix": string;
  "number-of-voices": string;
  "standard-instrumentation-type": string;
  "instrumentation-description": string;
}

export const initInsForm = {
  "record-prefix": "INS",
  "number-of-voices": "",
  "standard-instrumentation-type": "",
  "instrumentation-description": "",
};

const InsForm = () => {
  const [insForm, setForm] = useState<IInsForm>(initInsForm);
  const { handleUpdateInsForm } = useContext(CreateFormContext);

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
    const newInsForm = {
      "record-prefix":
        "IND" + numericOnlyGen(InsFormConfig["record-prefix"].length - 3),
      "number-of-voices": numericOnlyGen(
        InsFormConfig["numbers-of-players"].length
      ),
      "standard-instrumentation-type": standardInstrumentsKenGen(),
      "instrumentation-description": "",
    };
    setForm(newInsForm);
    handleUpdateInsForm(newInsForm);
  };
  return (
    <>
      <FormControl>
        <InputLabel htmlFor="record-prefix">Record Prefix</InputLabel>
        <Input
          id="record-prefix"
          aria-describedby="record-prefix-helper-text"
          value={insForm["record-prefix"]}
          onChange={handleInputChange}
          inputProps={{ maxLength: InsFormConfig["record-prefix"].length }}
        />
        <FormHelperText id="record-prefix-helper-text">
          Set Record Type = INS (Instrumentation Summary). (Size:{" "}
          {InsFormConfig["record-prefix"].length})
        </FormHelperText>
      </FormControl>
      <br />

      <FormControl>
        <InputLabel htmlFor="number-of-voices">Number of Voices</InputLabel>
        <Input
          id="number-of-voices"
          aria-describedby="number-of-voices-helper-text"
          value={insForm["number-of-voices"]}
          onChange={handleInputChange}
          inputProps={{ maxLength: InsFormConfig["number-of-voices"].length }}
        />
        <FormHelperText id="number-of-voices-helper-text">
          Indicates the number of independent parts included in this work.
          (Size: {InsFormConfig["number-of-voices"].length})
        </FormHelperText>
      </FormControl>
      <br />

      <FormControl>
        <InputLabel htmlFor="standard-instrumentation-type">
          Standard Instrumentation Type
        </InputLabel>
        <Input
          id="standard-instrumentation-type"
          aria-describedby="standard-instrumentation-type-helper-text"
          value={insForm["standard-instrumentation-type"]}
          onChange={handleInputChange}
          inputProps={{
            maxLength: InsFormConfig["standard-instrumentation-type"].length,
          }}
        />
        <FormHelperText id="standard-instrumentation-type-helper-text">
          Describes instrumentation if standard instrumentation is used on this
          work. Note that this field is required if IND records are not entered
          and if Instrumentation Description is blank. These values reside in
          the Standard Instrumentation Table. (Size:{" "}
          {InsFormConfig["standard-instrumentation-type"].length})
        </FormHelperText>
      </FormControl>

      <br />

      <FormControl>
        <InputLabel htmlFor="instrumentation-description">
          nstrumentation Description
        </InputLabel>
        <Input
          id="instrumentation-description"
          aria-describedby="instrumentation-description-helper-text"
          value={insForm["instrumentation-description"]}
          onChange={handleInputChange}
          inputProps={{
            maxLength: InsFormConfig["instrumentation-description"].length,
          }}
        />
        <FormHelperText id="instrumentation-description-helper-text">
          Describes instrumentation if non-standard instrumentation is used on
          this work. Note that this field is required if IND records are not
          entered and if Standard Instrumentation Type is blank. (Size:{" "}
          {InsFormConfig["instrumentation-description"].length})
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

export default InsForm;
