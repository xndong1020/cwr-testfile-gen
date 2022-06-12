import IFormBase from "../forms/IFormBase";

export const recordStringGen = (form: IFormBase, noLineBreak = false) => {
  if (!form) return "";
  const formString = Object.entries(form)
    .filter(([key, _]) => key !== "type") // do not print type property
    .reduce((accu, [_, value]) => {
      accu += value;
      return accu;
    }, "");

  const lineBreak = noLineBreak ? "" : "\n";
  return !!formString.length ? `${formString}${lineBreak}` : "";
};
