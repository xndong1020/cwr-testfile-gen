import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Button,
} from "@mui/material";
import React, { useCallback, useContext, useState } from "react";
import { HdrFormConfig } from "../configurations/HdrFormConfig";
import { CreateFormContext } from "../contexts/FormContext";
import {
  dateGen,
  durationgGen,
  numericOnlyGen,
  whitespaceOnlygGen,
  wordsGen,
} from "../utils/dummyDataGenerators";
import { itemGenFromArray } from "../utils/referenceTableKeyGenerator";

export interface IHdrForm {
  "record-type": string;
  "sender-type": string;
  "sender-id": string;
  "sender-name": String;
  "edi-standard-version-number": string;
  "creation-date": string;
  "creation-time": string;
  "transmission-date": string;
  "character-set": string;
}

export const initHdrForm = {
  "record-type": "HDR",
  "sender-type": "",
  "sender-id": "",
  "sender-name": "",
  "edi-standard-version-number": "",
  "creation-date": "",
  "creation-time": "",
  "transmission-date": "",
  "character-set": "",
};

const HdrForm = () => {
  const [hdrForm, setHdrForm] = useState<IHdrForm>(initHdrForm);
  const { handleUpdateHdrForm } = useContext(CreateFormContext);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { id, value } = e.target;
      setHdrForm((prev) => {
        return {
          ...prev,
          [id]: value,
        };
      });
    },
    []
  );

  const handleGenerateHdr = () => {
    const hdr = {
      ...initHdrForm,
      "sender-type": itemGenFromArray<string>(["PB", "AA", "SO", "WR"]),
      "sender-id": numericOnlyGen(HdrFormConfig["sender-id"].length),
      "sender-name": wordsGen(45).toUpperCase(),
      "edi-standard-version-number": "01.10",
      "creation-date": dateGen(),
      "creation-time": durationgGen({
        hours: { min: 0, max: 9 },
        minutes: { min: 0, max: 60 },
        seconds: { min: 0, max: 60 },
      }),
      "transmission-date": dateGen(),
      "character-set": whitespaceOnlygGen(
        HdrFormConfig["character-set"].length
      ),
    };
    setHdrForm(hdr);
    handleUpdateHdrForm(hdr);
  };

  return (
    <>
      <FormControl>
        <InputLabel htmlFor="sender-type">Sender Type</InputLabel>
        <Input
          id="sender-type"
          aria-describedby="sender-type-helper-text"
          value={hdrForm["sender-type"]}
          onChange={handleInputChange}
          inputProps={{ maxLength: HdrFormConfig["sender-type"].length }}
        />
        <FormHelperText id="sender-type-helper-text">
          Indicates if the sender of the file is a society or a publisher.
          Values are PB = Publisher, SO = Society, AA = Administrative Agency,
          WR = Writer. If CWR Sender ID (IPNN) greater than 9 digits (without
          the 2 leading 0) then use Sender Type field to provide leading numbers
          of the CWR Sender ID. (Size: {HdrFormConfig["sender-type"].length})
        </FormHelperText>
      </FormControl>
      <br />

      <FormControl>
        <InputLabel htmlFor="sender-id">Sender ID</InputLabel>
        <Input
          id="sender-id"
          aria-describedby="sender-id-helper-text"
          value={hdrForm["sender-id"]}
          onChange={handleInputChange}
          inputProps={{ maxLength: HdrFormConfig["sender-id"].length }}
        />
        <FormHelperText id="sender-id-helper-text">
          If Sender Type is equal to PB, AA, or WR, the sender must enter their
          assigned CWR IPI # in this field. These values reside in the CWR
          Sender ID and Codes Table. If Sender Type is equal to SO, the sending
          society must enter their Society Code. These values reside in the
          Society Code Table. If CWR Sender ID (IPNN) greater than 9 digits then
          use Sender ID to provide remaining numbers of the CWR Sender ID.
          (Size: {HdrFormConfig["sender-id"].length})
        </FormHelperText>
      </FormControl>
      <br />

      <FormControl>
        <InputLabel htmlFor="sender-name">Sender Name</InputLabel>
        <Input
          id="sender-name"
          aria-describedby="sender-name-helper-text"
          value={hdrForm["sender-name"]}
          onChange={handleInputChange}
          inputProps={{ maxLength: HdrFormConfig["sender-name"].length }}
        />
        <FormHelperText id="sender-name-helper-text">
          The name of the sender (publisher, society, agency). (Size:{" "}
          {HdrFormConfig["sender-name"].length})
        </FormHelperText>
      </FormControl>
      <br />

      <FormControl>
        <InputLabel htmlFor="edi-standard-version-number">
          EDI Standard Version Number
        </InputLabel>
        <Input
          id="edi-standard-version-number"
          aria-describedby="edi-standard-version-number-helper-text"
          value={hdrForm["edi-standard-version-number"]}
          onChange={handleInputChange}
          inputProps={{
            maxLength: HdrFormConfig["edi-standard-version-number"].length,
          }}
        />
        <FormHelperText id="edi-standard-version-number-helper-text">
          ndicates which version of the header and trailer records was used to
          create the data in this file. This field must be set to 01.10 for this
          version of the standard. (Size:{" "}
          {HdrFormConfig["edi-standard-version-number"].length})
        </FormHelperText>
      </FormControl>
      <br />

      <FormControl>
        <InputLabel htmlFor="creation-date">Creation Date</InputLabel>
        <Input
          id="creation-date"
          aria-describedby="creation-date-helper-text"
          value={hdrForm["creation-date"]}
          onChange={handleInputChange}
          inputProps={{ maxLength: HdrFormConfig["creation-date"].length }}
        />
        <FormHelperText id="creation-date-helper-text">
          The date that this file was created. (Size:{" "}
          {HdrFormConfig["creation-date"].length})
        </FormHelperText>
      </FormControl>
      <br />

      <FormControl>
        <InputLabel htmlFor="creation-time">Creation Time</InputLabel>
        <Input
          id="creation-time"
          aria-describedby="creation-date-helper-text"
          value={hdrForm["creation-time"]}
          onChange={handleInputChange}
          inputProps={{ maxLength: HdrFormConfig["creation-time"].length }}
        />
        <FormHelperText id="creation-time-helper-text">
          The time of day that this file was created. (Size:{" "}
          {HdrFormConfig["creation-time"].length})
        </FormHelperText>
      </FormControl>
      <br />

      <FormControl>
        <InputLabel htmlFor="creation-time">Creation Time</InputLabel>
        <Input
          id="creation-time"
          aria-describedby="creation-date-helper-text"
          value={hdrForm["creation-time"]}
          onChange={handleInputChange}
          inputProps={{ maxLength: HdrFormConfig["creation-time"].length }}
        />
        <FormHelperText id="creation-time-helper-text">
          The time of day that this file was created. (Size:{" "}
          {HdrFormConfig["creation-time"].length})
        </FormHelperText>
      </FormControl>
      <br />

      <FormControl>
        <InputLabel htmlFor="transmission-date">Transmission Date</InputLabel>
        <Input
          id="transmission-date"
          aria-describedby="transmission-date-helper-text"
          value={hdrForm["transmission-date"]}
          onChange={handleInputChange}
          inputProps={{ maxLength: HdrFormConfig["transmission-date"].length }}
        />
        <FormHelperText id="transmission-date-helper-text">
          The date that this file was transmitted to all receiving entities.
          (Size: {HdrFormConfig["transmission-date"].length})
        </FormHelperText>
      </FormControl>
      <br />

      <FormControl>
        <InputLabel htmlFor="character-set">Character Set</InputLabel>
        <Input
          id="character-set"
          aria-describedby="character-set-helper-text"
          value={hdrForm["character-set"]}
          onChange={handleInputChange}
          inputProps={{ maxLength: HdrFormConfig["character-set"].length }}
        />
        <FormHelperText id="tcharacter-set-helper-text">
          To be used if this file contains data in a character set other than
          ASCII. (Size: {HdrFormConfig["character-set"].length})
        </FormHelperText>
      </FormControl>
      <br />
      <Button
        variant="contained"
        color="success"
        onClick={() => handleGenerateHdr()}
        sx={{
          paddingRight: 20,
        }}
      >
        Generate All Fields
      </Button>
    </>
  );
};

export default HdrForm;
