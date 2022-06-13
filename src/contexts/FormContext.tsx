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
import { ITrlForm } from "../forms/TrlForm";

export interface ITransaction {
  nwr?: INwrForm;
  ind?: IIndForm;
  ins?: IInsForm;
  alt?: IAltForm;
}

export interface IGroup {
  grh: IGrhForm;
  transactions: ITransaction[];
  activeTransactionIndex: number;
  grt: IGrtForm;
}

export interface IFormContext {
  hdr: IHdrForm;
  trl: ITrlForm;
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
      transactions: [
        {
          nwr: initNwrForm,
          ind: initIndForm,
          ins: initInsForm,
          alt: initAltForm,
        },
      ],
      activeTransactionIndex: 0,
      grt: initGrtForm,
    },
  ],
  trl: {
    type: "TRL",
    "record-type": "TRL",
    "group-count": "1",
    "transaction-count": "",
    "record-count": "",
  },
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
              {
                grh: initGrhForm,
                grt: initGrtForm,
                transactions: [],
                activeTransactionIndex: 0,
              },
            ],
          }));
          break;

        case "NEW TRANSACTION":
          setState((prevState: IFormContext) => {
            const currentGroup = prevState.groups[prevState.groups.length - 1];
            const newCurrentGroup = {
              ...currentGroup,
              transaction: currentGroup.transactions.push({}),
            };
            const otherGroups = slice(
              prevState.groups,
              0,
              prevState.groups.length - 1
            );
            return {
              ...prevState,
              groups: [...otherGroups, newCurrentGroup],
            };
          });
          break;

        case "NWR":
          setState((prevState: IFormContext) => {
            const currentGroup = prevState.groups[prevState.groups.length - 1];

            const currentTransaction =
              currentGroup.transactions[currentGroup.transactions.length - 1];

            const otherTransactions = slice(
              currentGroup.transactions,
              0,
              currentGroup.transactions.length - 1
            );

            const newCurrentGroup = {
              ...currentGroup,
              transactions: [
                ...otherTransactions,
                { ...currentTransaction, nwr: initNwrForm },
              ],
            };

            const otherGroups = slice(
              prevState.groups,
              0,
              prevState.groups.length - 1
            );
            return {
              ...prevState,
              groups: [...otherGroups, { ...newCurrentGroup }],
            };
          });
          break;

        case "IND":
          setState((prevState: IFormContext) => {
            const currentGroup = prevState.groups[prevState.groups.length - 1];

            const currentTransaction =
              currentGroup.transactions[currentGroup.transactions.length - 1];

            const otherTransactions = slice(
              currentGroup.transactions,
              0,
              currentGroup.transactions.length - 1
            );

            const newCurrentGroup = {
              ...currentGroup,
              transactions: [
                ...otherTransactions,
                { ...currentTransaction, ind: initIndForm },
              ],
            };

            const otherGroups = slice(
              prevState.groups,
              0,
              prevState.groups.length - 1
            );
            return {
              ...prevState,
              groups: [...otherGroups, { ...newCurrentGroup }],
            };
          });
          break;

        case "INS":
          setState((prevState: IFormContext) => {
            const currentGroup = prevState.groups[prevState.groups.length - 1];

            const currentTransaction =
              currentGroup.transactions[currentGroup.transactions.length - 1];

            const otherTransactions = slice(
              currentGroup.transactions,
              0,
              currentGroup.transactions.length - 1
            );

            const newCurrentGroup = {
              ...currentGroup,
              transactions: [
                ...otherTransactions,
                { ...currentTransaction, ins: initInsForm },
              ],
            };

            const otherGroups = slice(
              prevState.groups,
              0,
              prevState.groups.length - 1
            );
            return {
              ...prevState,
              groups: [...otherGroups, { ...newCurrentGroup }],
            };
          });
          break;

        case "ALT":
          setState((prevState: IFormContext) => {
            const currentGroup = prevState.groups[prevState.groups.length - 1];

            const currentTransaction =
              currentGroup.transactions[currentGroup.transactions.length - 1];

            const otherTransactions = slice(
              currentGroup.transactions,
              0,
              currentGroup.transactions.length - 1
            );

            const newCurrentGroup = {
              ...currentGroup,
              transactions: [
                ...otherTransactions,
                { ...currentTransaction, alt: initAltForm },
              ],
            };

            const otherGroups = slice(
              prevState.groups,
              0,
              prevState.groups.length - 1
            );
            return {
              ...prevState,
              groups: [...otherGroups, { ...newCurrentGroup }],
            };
          });
          break;

        default:
          break;
      }
    };
    const handleUpdateRecord = (record: IFormBase) => {
      console.log("record update", record);
      switch (record.type) {
        case "HDR":
          setState((prevState: IFormContext) => ({
            ...prevState,
            hdr: record as IHdrForm,
          }));
          break;

        case "TRL":
          setState((prevState: IFormContext) => ({
            ...prevState,
            trl: record as ITrlForm,
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

            const currentTransaction =
              currentGroup.transactions[currentGroup.transactions.length - 1];

            const otherTransactions = slice(
              currentGroup.transactions,
              0,
              currentGroup.transactions.length - 1
            );

            const newCurrentGroup = {
              ...currentGroup,
              transactions: [
                ...otherTransactions,
                { ...currentTransaction, nwr: record as INwrForm },
              ],
            };

            const otherGroups = slice(
              prevState.groups,
              0,
              prevState.groups.length - 1
            );
            return {
              ...prevState,
              groups: [...otherGroups, { ...newCurrentGroup }],
            };
          });
          break;
        case "IND":
          setState((prevState: IFormContext) => {
            const currentGroup = prevState.groups[prevState.groups.length - 1];

            const currentTransaction =
              currentGroup.transactions[currentGroup.transactions.length - 1];

            const otherTransactions = slice(
              currentGroup.transactions,
              0,
              currentGroup.transactions.length - 1
            );

            const newCurrentGroup = {
              ...currentGroup,
              transactions: [
                ...otherTransactions,
                { ...currentTransaction, ind: record as IIndForm },
              ],
            };

            const otherGroups = slice(
              prevState.groups,
              0,
              prevState.groups.length - 1
            );
            return {
              ...prevState,
              groups: [...otherGroups, { ...newCurrentGroup }],
            };
          });
          break;
        case "INS":
          setState((prevState: IFormContext) => {
            const currentGroup = prevState.groups[prevState.groups.length - 1];

            const currentTransaction =
              currentGroup.transactions[currentGroup.transactions.length - 1];

            const otherTransactions = slice(
              currentGroup.transactions,
              0,
              currentGroup.transactions.length - 1
            );

            const newCurrentGroup = {
              ...currentGroup,
              transactions: [
                ...otherTransactions,
                { ...currentTransaction, ins: record as IInsForm },
              ],
            };

            const otherGroups = slice(
              prevState.groups,
              0,
              prevState.groups.length - 1
            );
            return {
              ...prevState,
              groups: [...otherGroups, { ...newCurrentGroup }],
            };
          });
          break;
        case "ALT":
          setState((prevState: IFormContext) => {
            const currentGroup = prevState.groups[prevState.groups.length - 1];

            const currentTransaction =
              currentGroup.transactions[currentGroup.transactions.length - 1];

            const otherTransactions = slice(
              currentGroup.transactions,
              0,
              currentGroup.transactions.length - 1
            );

            const newCurrentGroup = {
              ...currentGroup,
              transactions: [
                ...otherTransactions,
                { ...currentTransaction, alt: record as IAltForm },
              ],
            };

            const otherGroups = slice(
              prevState.groups,
              0,
              prevState.groups.length - 1
            );
            return {
              ...prevState,
              groups: [...otherGroups, { ...newCurrentGroup }],
            };
          });
          break;

        default:
          break;
      }
    };
    const [state, setState] = useState({
      hdr: {},
      groups: [
        {
          grh: initGrhForm,
          transactions: [{}],
          activeTransactionIndex: 0,
          grt: initGrtForm,
        },
      ],
      activeGroupIndex: 0,
      trl: {},
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
