import IFormBase from "../forms/IFormBase";

export const recordStringGen = (form: IFormBase, noLineBreak = false) => {
  if (!form) return "";
  const formString = Object.values(form).reduce((accu, cur) => {
    accu += cur;
    return accu;
  }, "");

  const lineBreak = noLineBreak ? "" : "\n";
  return !!formString.length ? `${formString}${lineBreak}` : "";
};
