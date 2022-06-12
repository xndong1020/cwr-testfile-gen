import React, { createContext, memo, useState } from "react";
import { IAltForm } from "../forms/AltForm";
import { IGrhForm } from "../forms/GrhForm";
import { IGrtForm } from "../forms/GrtForm";
import { IHdrForm } from "../forms/HdrForm";
import IFormBase from "../forms/IFormBase";
import { IIndForm } from "../forms/IndForm";
import { IInsForm } from "../forms/InsForm";
import { INwrForm } from "../forms/NwrForm";

export interface IGroups {}

export interface IFormContext {
  grh: IGrhForm;
  grt: IGrtForm;
  hdr: IHdrForm;
  nwr: INwrForm;
  ind: IIndForm;
  ins: IInsForm;
  alt: IAltForm;
  handleUpdateRecord: (record: IFormBase) => void;
}

export const initFormContextValues: IFormContext = {
  grh: {
    type: "GRH",
    "record-type": "GRH",
    "transaction-type": "NWR",
    "group-id": "",
    "version-number": "02.10",
    "batch-request": "",
    "submission-distribution-type": "",
  },
  grt: {
    type: "GRT",
    "record-type": "GRT",
    "group-id": "",
    "transaction-count": "",
    "record-count": "",
    "currency-indicator": "",
    "total-monetary-value": "",
  },
  hdr: {
    type: "HDR",
    "record-type": "HDR",
    "sender-type": "",
    "sender-id": "",
    "sender-name": "",
    "edi-standard-version-number": "",
    "creation-date": "",
    "creation-time": "",
    "transmission-date": "",
    "character-set": "",
  },
  nwr: {
    type: "NWR",
    "record-type": "NWR",
    "transaction-sequence-number": "",
    "record-sequence-number": "",
    "work-title": "",
    "language-code": "",
    "submitter-work": "",
    iswc: "",
    "copyright-date": "",
    "copyright-number": "",
    "musical-work-distribution": "",
    "category-duration": "",
    "recorded-indicator": "",
    "text-music-relationship": "",
    "relationship-composite-type": "",
    "version-type": "",
    "excerpt-type": "",
    "music-arrangement": "",
    "lyric-adaptation": "",
    "contact-name": "",
    "contact-id": "",
    "cwr-work-type": "",
    "grand-rights-ind": "",
    "composite-component-count": "",
    "date-of-publication-of-printed-edition": "",
    "exceptional-clause": "",
    "opus-number": "",
    "catalogue-number": "",
    "priority-flag": "",
  },
  ind: {
    type: "IND",
    "record-prefix": "IND",
    "instrument-code": "",
    "numbers-of-players": "",
  },
  ins: {
    type: "INS",
    "record-prefix": "INS",
    "number-of-voices": "",
    "standard-instrumentation-type": "",
    "instrumentation-description": "",
  },
  alt: {
    type: "ALT",
    "record-prefix": "ALT",
    "alternate-title": "",
    "title-type": "",
    "language-code": "",
  },
  handleUpdateRecord: (record: IFormBase) => {},
};

export const CreateFormContext = createContext<IFormContext>(
  initFormContextValues
);

function instanceOfIInsForm(object: any): object is IInsForm {
  return "type" in object && object.type === "INS";
}

export const CreateFormContextProvider = memo(
  ({ children }: { children: any }): JSX.Element => {
    const handleUpdateRecord = (record: IFormBase) => {
      console.log("record", record);
      switch (record.type) {
        case "GRH":
          setState((prevState: IFormContext) => ({
            ...prevState,
            grh: record as IGrhForm,
          }));
          break;
        case "GRT":
          setState((prevState: IFormContext) => ({
            ...prevState,
            grt: record as IGrtForm,
          }));
          break;
        case "HDR":
          setState((prevState: IFormContext) => ({
            ...prevState,
            hdr: record as IHdrForm,
          }));
          break;
        case "NWR":
          setState((prevState: IFormContext) => ({
            ...prevState,
            hdr: record as IHdrForm,
          }));
          break;
        case "IND":
          setState((prevState: IFormContext) => ({
            ...prevState,
            ind: record as IIndForm,
          }));
          break;
        case "INS":
          setState((prevState: IFormContext) => ({
            ...prevState,
            ins: record as IInsForm,
          }));
          break;
        case "ALT":
          setState((prevState: IFormContext) => ({
            ...prevState,
            hdr: record as IHdrForm,
          }));
          break;

        default:
          break;
      }
    };
    const [state, setState] = useState({
      grh: {},
      grt: {},
      hdr: {},
      nwr: {},
      ind: {},
      ins: {},
      alt: {},
      handleUpdateRecord,
    } as IFormContext);

    return (
      <CreateFormContext.Provider value={state}>
        {children}
      </CreateFormContext.Provider>
    );
  }
);
