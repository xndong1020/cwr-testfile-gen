import React, { createContext, memo, useState } from "react";

export interface ITagContext {
  isNwrActive: boolean;
  isIndActive: boolean;
  handleSetItemActive: (name: string) => void;
}
export const initTagContextValues: ITagContext = {
  isNwrActive: false,
  isIndActive: false,
  handleSetItemActive: (name: string) => {},
};

export const CreateTagContext =
  createContext<ITagContext>(initTagContextValues);

export const CreateTagContextProvider = memo(
  ({ children }: { children: any }): JSX.Element => {
    const handleSetItemActive = (name: string) => {
      switch (name) {
        case "NWR":
          setState((prevState: ITagContext) => ({
            ...prevState,
            isNwrActive: !prevState.isNwrActive,
          }));
          break;

        case "IND":
          setState((prevState: ITagContext) => ({
            ...prevState,
            isIndActive: !prevState.isIndActive,
          }));
          break;

        default:
          break;
      }
    };
    const [state, setState] = useState({
      isNwrActive: false,
      isIndActive: false,
      handleSetItemActive,
    } as ITagContext);

    return (
      <CreateTagContext.Provider value={state}>
        {children}
      </CreateTagContext.Provider>
    );
  }
);
