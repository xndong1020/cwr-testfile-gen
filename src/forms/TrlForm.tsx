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
import {
  numericOnlyGen,
  padLeftGen,
  wordsGen,
} from "../utils/dummyDataGenerators";
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

interface ITrlFormProps {
  sx?: Record<string, string>;
}

const TrlForm = ({ sx = {} }: ITrlFormProps) => {
  const {
    groups,
    handleUpdateRecord,
    trl = { ...initTrlForm },
  } = useContext(CreateFormContext);
  console.log("TrlForm", trl);

  useEffect(() => {
    const updateState = () => {
      const records = groups;
      const numberOfTransactions = groups.reduce((acc, group) => {
        acc += group.transactions.length;
        return acc;
      }, 0);
      const numberOfRecords = groups.reduce((acc, group) => {
        Object.keys(group).forEach((key) => {
          acc += 1;
        });
        return acc;
      }, 0);
      const newGrtForm = {
        ...initTrlForm,
        "group-count": padLeftGen(
          groups.length.toString(),
          TrlFormConfig["group-count"].length
        ),
        "transaction-count": padLeftGen(
          numberOfTransactions.toString(),
          TrlFormConfig["group-count"].length
        ),
        "record-count": padLeftGen(
          numberOfRecords.toString(),
          TrlFormConfig["group-count"].length
        ),
      };
      handleUpdateRecord(newGrtForm);
    };
    updateState();
  }, [groups, handleUpdateRecord]);
  return (
    <Paper
      elevation={3}
      sx={{ ...sx, lineHeight: 3 }}
    >{`Transmission Trailer: Total Groups ${trl["group-count"]}, Total Transactions: ${trl["transaction-count"]}, Total Records: ${trl["record-count"]} `}</Paper>
  );
};

export default TrlForm;
