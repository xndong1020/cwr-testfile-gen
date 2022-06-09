import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Button,
} from "@mui/material";
import React, { useState, useCallback, useContext } from "react";
import { AltFormConfig } from "../configurations/AltFormConfig";
import { CreateFormContext } from "../contexts/FormContext";
import { numericOnlyGen, wordsGen } from "../utils/dummyDataGenerators";
import {
  languageKeyGen,
  titleTypesKenGen,
} from "../utils/referenceTableKeyGenerator";
import IFormBase from "./IFormBase";

export interface IAltForm extends IFormBase {
  "record-prefix": string;
  "alternate-title": string;
  "title-type": string;
  "language-code": string;
}

export const initAltForm = {
  "record-prefix": "ALT",
  "alternate-title": "",
  "title-type": "",
  "language-code": "",
};

const IndForm = () => {
  const [altForm, setForm] = useState<IAltForm>(initAltForm);
  const { handleUpdateAltForm } = useContext(CreateFormContext);

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
    const newAltForm = {
      "record-prefix":
        "ALT" + numericOnlyGen(AltFormConfig["record-prefix"].length - 3),
      "alternate-title": wordsGen().toUpperCase(),
      "title-type": titleTypesKenGen(),
      "language-code": languageKeyGen(),
    };
    setForm(newAltForm);
    handleUpdateAltForm(newAltForm);
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
          inputProps={{ maxLength: AltFormConfig["record-prefix"].length }}
        />
        <FormHelperText id="record-prefix-helper-text">
          Set Record Type = ALT (Alternate Title). (Size:{" "}
          {AltFormConfig["record-prefix"].length})
        </FormHelperText>
      </FormControl>
      <br />

      <FormControl>
        <InputLabel htmlFor="alternate-title">Alternate Title</InputLabel>
        <Input
          id="alternate-title"
          aria-describedby="alternate-title-helper-text"
          value={altForm["alternate-title"]}
          onChange={handleInputChange}
          inputProps={{ maxLength: AltFormConfig["alternate-title"].length }}
        />
        <FormHelperText id="alternate-title-helper-text">
          AKA or pseudonym of the work title.. (Size:{" "}
          {AltFormConfig["alternate-title"].length})
        </FormHelperText>
      </FormControl>
      <br />

      <FormControl>
        <InputLabel htmlFor="title-type">Title Type</InputLabel>
        <Input
          id="title-type"
          aria-describedby="title-type-helper-text"
          value={altForm["title-type"]}
          onChange={handleInputChange}
          inputProps={{ maxLength: AltFormConfig["title-type"].length }}
        />
        <FormHelperText id="title-type-helper-text">
          Indicates the type of alternate title presented on this record. These
          values reside in the Title Type Table. (Size:{" "}
          {AltFormConfig["title-type"].length})
        </FormHelperText>
      </FormControl>

      <br />

      <FormControl>
        <InputLabel htmlFor="language-code">Language Code</InputLabel>
        <Input
          id="language-code"
          aria-describedby="language-code-helper-text"
          value={altForm["language-code"]}
          onChange={handleInputChange}
          inputProps={{ maxLength: AltFormConfig["language-code"].length }}
        />
        <FormHelperText id="language-code-helper-text">
          The code representing the language that this alternate title has been
          translated into. These values reside in the Language Code Table. A
          language Code Must be entered if the Title Type is equal to “OL” or
          “AL”. (Size: {AltFormConfig["language-code"].length})
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
