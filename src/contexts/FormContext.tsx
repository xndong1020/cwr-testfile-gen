import React, { createContext, memo, useState } from "react";
import slice from "lodash-es/slice";
import { IAltForm } from "../forms/AltForm";
import { IGrhForm } from "../forms/GrhForm";
import { IGrtForm } from "../forms/GrtForm";
import { IHdrForm } from "../forms/HdrForm";
import IFormBase from "../forms/IFormBase";
import { IIndForm } from "../forms/IndForm";
import { IInsForm } from "../forms/InsForm";
import { INwrForm } from "../forms/NwrForm";

export interface IGroup {
  grh: IGrhForm;
  nwr?: INwrForm;
  ind?: IIndForm;
  ins?: IInsForm;
  alt?: IAltForm;
  grt: IGrtForm;
}

export interface IFormContext {
  hdr: IHdrForm;
  groups: IGroup[];
  activeGroupIndex: number;
  handleSetRecordActive: (name: string) => void;
  handleUpdateRecord: (record: IFormBase) => void;
}

const initGrhForm = {
  type: "GRH",
  "record-type": "GRH",
  "transaction-type": "NWR",
  "group-id": "",
  "version-number": "02.10",
  "batch-request": "",
  "submission-distribution-type": "",
};

const initGrtForm = {
  type: "GRT",
  "record-type": "GRT",
  "group-id": "",
  "transaction-count": "",
  "record-count": "",
  "currency-indicator": "",
  "total-monetary-value": "",
};

const initNwrForm = {
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
};

const initIndForm = {
  type: "IND",
  "record-prefix": "IND",
  "instrument-code": "",
  "numbers-of-players": "",
};

const initInsForm = {
  type: "INS",
  "record-prefix": "INS",
  "number-of-voices": "",
  "standard-instrumentation-type": "",
  "instrumentation-description": "",
};

const initAltForm = {
  type: "ALT",
  "record-prefix": "ALT",
  "alternate-title": "",
  "title-type": "",
  "language-code": "",
};

export const initFormContextValues: IFormContext = {
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
  groups: [
    {
      grh: initGrhForm,
      nwr: initNwrForm,
      ind: initIndForm,
      ins: initInsForm,
      alt: initAltForm,
      grt: initGrtForm,
    },
  ],
  activeGroupIndex: 0,
  handleSetRecordActive: (name: string) => {},
  handleUpdateRecord: (record: IFormBase) => {},
};

export const CreateFormContext = createContext<IFormContext>(
  initFormContextValues
);

export const CreateFormContextProvider = memo(
  ({ children }: { children: any }): JSX.Element => {
    // add to current group
    const handleSetRecordActive = (name: string) => {
      switch (name) {
        case "NEW GROUP":
          setState((prevState: IFormContext) => ({
            ...prevState,
            activeGroupIndex: prevState.groups.length + 1,
            groups: [
              ...prevState.groups,
              { grh: initGrhForm, grt: initGrtForm },
            ],
          }));
          break;

        case "NWR":
          setState((prevState: IFormContext) => {
            const currentGroup = prevState.groups[prevState.groups.length - 1];
            const otherGroups = slice(
              prevState.groups,
              0,
              prevState.groups.length - 1
            );
            return {
              ...prevState,
              groups: [...otherGroups, { ...currentGroup, nwr: initNwrForm }],
            };
          });
          break;

        case "IND":
          setState((prevState: IFormContext) => {
            const currentGroup = prevState.groups[prevState.groups.length - 1];
            const otherGroups = slice(
              prevState.groups,
              0,
              prevState.groups.length - 1
            );
            return {
              ...prevState,
              groups: [...otherGroups, { ...currentGroup, ind: initIndForm }],
            };
          });
          break;

        case "INS":
          setState((prevState: IFormContext) => {
            const currentGroup = prevState.groups[prevState.groups.length - 1];
            const otherGroups = slice(
              prevState.groups,
              0,
              prevState.groups.length - 1
            );
            return {
              ...prevState,
              groups: [...otherGroups, { ...currentGroup, ins: initInsForm }],
            };
          });
          break;

        case "ALT":
          setState((prevState: IFormContext) => {
            const currentGroup = prevState.groups[prevState.groups.length - 1];
            const otherGroups = slice(
              prevState.groups,
              0,
              prevState.groups.length - 1
            );
            return {
              ...prevState,
              groups: [...otherGroups, { ...currentGroup, alt: initAltForm }],
            };
          });
          break;

        default:
          break;
      }
    };
    const handleUpdateRecord = (record: IFormBase) => {
      switch (record.type) {
        case "HDR":
          setState((prevState: IFormContext) => ({
            ...prevState,
            hdr: record as IHdrForm,
          }));
          break;

        case "GRH":
          setState((prevState: IFormContext) => {
            const currentGroup = prevState.groups[prevState.groups.length - 1];
            const otherGroups = slice(
              prevState.groups,
              0,
              prevState.groups.length - 1
            );
            return {
              ...prevState,
              groups: [
                ...otherGroups,
                { ...currentGroup, grh: record as IGrhForm },
              ],
            };
          });
          break;

        case "GRT":
          setState((prevState: IFormContext) => {
            const currentGroup = prevState.groups[prevState.groups.length - 1];
            const otherGroups = slice(
              prevState.groups,
              0,
              prevState.groups.length - 1
            );
            return {
              ...prevState,
              groups: [
                ...otherGroups,
                { ...currentGroup, grt: record as IGrtForm },
              ],
            };
          });
          break;

        case "NWR":
          setState((prevState: IFormContext) => {
            const currentGroup = prevState.groups[prevState.groups.length - 1];
            const otherGroups = slice(
              prevState.groups,
              0,
              prevState.groups.length - 1
            );
            return {
              ...prevState,
              groups: [
                ...otherGroups,
                { ...currentGroup, nwr: record as INwrForm },
              ],
            };
          });
          break;
        case "IND":
          setState((prevState: IFormContext) => {
            const currentGroup = prevState.groups[prevState.groups.length - 1];
            const otherGroups = slice(
              prevState.groups,
              0,
              prevState.groups.length - 1
            );
            return {
              ...prevState,
              groups: [
                ...otherGroups,
                { ...currentGroup, ind: record as IIndForm },
              ],
            };
          });
          break;
        case "INS":
          setState((prevState: IFormContext) => {
            const currentGroup = prevState.groups[prevState.groups.length - 1];
            const otherGroups = slice(
              prevState.groups,
              0,
              prevState.groups.length - 1
            );
            return {
              ...prevState,
              groups: [
                ...otherGroups,
                { ...currentGroup, ins: record as IInsForm },
              ],
            };
          });
          break;
        case "ALT":
          setState((prevState: IFormContext) => {
            const currentGroup = prevState.groups[prevState.groups.length - 1];
            const otherGroups = slice(
              prevState.groups,
              0,
              prevState.groups.length - 1
            );
            return {
              ...prevState,
              groups: [
                ...otherGroups,
                { ...currentGroup, alt: record as IAltForm },
              ],
            };
          });
          break;

        default:
          break;
      }
    };
    const [state, setState] = useState({
      hdr: {},
      groups: [{}],
      activeGroupIndex: 0,
      handleSetRecordActive,
      handleUpdateRecord,
    } as IFormContext);

    return (
      <CreateFormContext.Provider value={state}>
        {children}
      </CreateFormContext.Provider>
    );
  }
);
