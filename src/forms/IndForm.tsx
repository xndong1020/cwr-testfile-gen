import React from "react";
import { IndFormConfig } from "../configurations/IndFormConfig";
import { numericOnlyGen } from "../utils/dummyDataGenerators";

export interface IIndForm {
  "record-prefix": string;
  "instrument-code": string;
  "numbers-of-players": string;
}

export const initIndForm = {
  "record-prefix": "IND",
  "instrument-code": "",
  "numbers-of-players": numericOnlyGen(
    IndFormConfig["numbers-of-players"].length
  ),
};

const IndForm = () => {
  return <div>IndForm</div>;
};

export default IndForm;
