import React, { createContext, memo, useState } from "react";

export interface ITagContext {
  activeHdrCount: number;
  activeAltCount: number;
  activeNwrCount: number;
  activeIndCount: number;
  activeInsCount: number;
  activeGroupsCount: number;
  handleSetItemActive: (name: string) => void;
}
export const initTagContextValues: ITagContext = {
  activeHdrCount: 0,
  activeAltCount: 0,
  activeNwrCount: 0,
  activeIndCount: 0,
  activeInsCount: 0,
  activeGroupsCount: 0,
  handleSetItemActive: (name: string) => {},
};

export const CreateTagContext =
  createContext<ITagContext>(initTagContextValues);

export const CreateTagContextProvider = memo(
  ({ children }: { children: any }): JSX.Element => {
    const handleSetItemActive = (name: string) => {
      switch (name) {
        case "HDR":
          setState((prevState: ITagContext) => ({
            ...prevState,
            activeHdrCount: prevState.activeHdrCount + 1,
          }));
          break;

        case "NWR":
          setState((prevState: ITagContext) => ({
            ...prevState,
            activeNwrCount: prevState.activeNwrCount + 1,
          }));
          break;

        case "IND":
          setState((prevState: ITagContext) => ({
            ...prevState,
            activeIndCount: prevState.activeIndCount + 1,
          }));
          break;

        case "INS":
          setState((prevState: ITagContext) => ({
            ...prevState,
            activeInsCount: prevState.activeInsCount + 1,
          }));
          break;

        case "GRH":
        case "GRT":
          setState((prevState: ITagContext) => ({
            ...prevState,
            activeGroupsCount: prevState.activeGroupsCount + 1,
          }));
          break;

        case "ALT":
          setState((prevState: ITagContext) => ({
            ...prevState,
            activeAltCount: prevState.activeAltCount + 1,
          }));
          break;

        default:
          break;
      }
    };
    const [state, setState] = useState({
      activeHdrCount: 0,
      activeAltCount: 0,
      activeNwrCount: 0,
      activeIndCount: 0,
      activeInsCount: 0,
      activeGroupsCount: 0,
      handleSetItemActive,
    } as ITagContext);

    return (
      <CreateTagContext.Provider value={state}>
        {children}
      </CreateTagContext.Provider>
    );
  }
);
