import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Button,
  Paper,
} from "@mui/material";
import React, { useState, useCallback, useContext, useEffect } from "react";
import { TrlFormConfig } from "../configurations/TrlFormConfig";
import { CreateFormContext } from "../contexts/FormContext";
import { numericOnlyGen, wordsGen } from "../utils/dummyDataGenerators";
import {
  languageKeyGen,
  titleTypesKenGen,
} from "../utils/referenceTableKeyGenerator";
import IFormBase from "./IFormBase";
import { transactionType } from "../referenceTables/transactionType";

export interface ITrlForm extends IFormBase {
  "record-type": string;
  "group-count": string;
  "transaction-count": string;
  "record-count": string;
}

export const initTrlForm: ITrlForm = {
  type: "TRL",
  "record-type": "TRL",
  "group-count": "",
  "transaction-count": "",
  "record-count": "",
};

const TrlForm = () => {
  const { groups, handleUpdateRecord } = useContext(CreateFormContext);

  useEffect(() => {
    const updateState = () => {
      const records = groups.flat(1).flat(1);
      console.log("records", records);
      const newGrtForm = {
        ...initTrlForm,
        "group-count": groups.length,
        "transaction-count": 1,
        "record-count": groups.flat(1).length,
      };
      handleUpdateRecord(newGrtForm);
    };
    updateState();
  }, [groups, handleUpdateRecord]);
  return (
    <Paper elevation={3}>{`Transmission Trailer: Total Groups ${
      groups.length
    }, Total Transactions: ${1}, Total Records: ${1} `}</Paper>
  );
};

export default TrlForm;
