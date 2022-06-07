import { compositeType } from "../referenceTables/compositeType";
import { cwrWorkType } from "../referenceTables/cwrWorkType";
import { excerptType } from "../referenceTables/excerptType";
import { languageCodeTable } from "../referenceTables/language";
import { lyricAdaptation } from "../referenceTables/lyricAdaptation";
import { musicalWorkDistributionCategory } from "../referenceTables/musicalWorkDistributionCategory";
import { musicArrangement } from "../referenceTables/musicArrangement";
import { textMusicRelationship } from "../referenceTables/textMusicRelationship";
import { versionType } from "../referenceTables/versionType";

export const tableKeyGen = (table: Record<string, string>): string => {
  const keys = Object.keys(table);
  return keys[Math.floor(Math.random() * keys.length)];
};

export const itemGenFromArray = <T = any>(arr: Array<T>): T => {
  return arr[Math.floor(Math.random() * arr.length)];
};

export const languageKeyGen = (): string => {
  return tableKeyGen(languageCodeTable);
};

export const musicalWorkDistributionCategoryKeyGen = (): string => {
  return tableKeyGen(musicalWorkDistributionCategory);
};

export const textMusicRelationshipKeyGen = (): string => {
  return tableKeyGen(textMusicRelationship);
};

export const compositeTypeKeyGen = (): string => {
  return tableKeyGen(compositeType);
};

export const versionTypeKeyGen = (): string => {
  return tableKeyGen(versionType);
};

export const excerptTypeKenGen = (): string => {
  return tableKeyGen(excerptType);
};

export const musicArrangementKenGen = (): string => {
  return tableKeyGen(musicArrangement);
};

export const lyricAdaptationKenGen = (): string => {
  return tableKeyGen(lyricAdaptation);
};

export const cwrWorkTypeKenGen = (): string => {
  return tableKeyGen(cwrWorkType);
};

export const booleanValueGen = (): string => {
  return tableKeyGen({ Y: "Y", N: "N" });
};
