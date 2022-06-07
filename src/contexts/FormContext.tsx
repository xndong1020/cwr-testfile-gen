import React, { createContext, memo, useState } from "react";
import { IGrhForm } from "../forms/GrhForm";
import { IGrtForm } from "../forms/GrtForm";
import { IHdrForm } from "../forms/HdrForm";
import { IIndForm } from "../forms/IndForm";
import { INwrForm } from "../forms/NwrForm";

export interface IFormContext {
  grh: IGrhForm;
  grt: IGrtForm;
  hdr: IHdrForm;
  nwr: INwrForm;
  ind: IIndForm;
  handleUpdateGrhForm: (grh: IGrhForm) => void;
  handleUpdateGrtForm: (grt: IGrtForm) => void;
  handleUpdateHdrForm: (hdr: IHdrForm) => void;
  handleUpdateNrwForm: (nwr: INwrForm) => void;
  handleUpdateIndForm: (nwr: IIndForm) => void;
}

export const initFormContextValues: IFormContext = {
  grh: {
    "record-type": "GRH",
    "transaction-type": "NWR",
    "group-id": "",
    "version-number": "02.10",
    "batch-request": "",
    "submission-distribution-type": "",
  },
  grt: {
    "record-type": "GRT",
    "group-id": "",
    "transaction-count": "",
    "record-count": "",
    "currency-indicator": "",
    "total-monetary-value": "",
  },
  hdr: {
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
    "record-type": "",
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
    "record-prefix": "IND",
    "instrument-code": "",
    "numbers-of-players": "",
  },
  handleUpdateGrhForm: (grh: IGrhForm) => {},
  handleUpdateGrtForm: (grt: IGrtForm) => {},
  handleUpdateHdrForm: (hdr: IHdrForm) => {},
  handleUpdateNrwForm: (nwr: INwrForm) => {},
  handleUpdateIndForm: (nwr: IIndForm) => {},
};

export const CreateFormContext = createContext<IFormContext>(
  initFormContextValues
);

export const CreateFormContextProvider = memo(
  ({ children }: { children: any }): JSX.Element => {
    const handleUpdateGrhForm = (grh: IGrhForm) => {
      setState((prevState: IFormContext) => ({
        ...prevState,
        grh,
      }));
    };
    const handleUpdateGrtForm = (grt: IGrtForm) => {
      setState((prevState: IFormContext) => ({
        ...prevState,
        grt,
      }));
    };
    const handleUpdateHdrForm = (hdr: IHdrForm) => {
      setState((prevState: IFormContext) => ({
        ...prevState,
        hdr,
      }));
    };
    const handleUpdateNrwForm = (nwr: INwrForm) => {
      setState((prevState: IFormContext) => ({
        ...prevState,
        nwr,
      }));
    };
    const handleUpdateIndForm = (ind: IIndForm) => {
      setState((prevState: IFormContext) => ({
        ...prevState,
        ind,
      }));
    };
    const [state, setState] = useState({
      grh: {},
      grt: {},
      hdr: {},
      nwr: {},
      ind: {},
      handleUpdateGrhForm,
      handleUpdateGrtForm,
      handleUpdateNrwForm,
      handleUpdateHdrForm,
      handleUpdateIndForm,
    } as IFormContext);

    return (
      <CreateFormContext.Provider value={state}>
        {children}
      </CreateFormContext.Provider>
    );
  }
);
