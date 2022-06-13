import { faker } from "@faker-js/faker";
import { format } from "date-fns";

export const wordsGen = (length: number = 60): string => {
  const title = faker.random.words(4);

  if (title.length > length) return title.substring(0, length);
  if (title.length < length) return title.padEnd(length, " ");
  return title;
};

export const numericOnlyGen = (length: number = 14): string => {
  return faker.random.numeric(length);
};

export const dateGen = (isPastDate: boolean = true): string => {
  const date = isPastDate ? faker.date.past() : faker.date.future();
  const result = format(date, "yyyyMMdd");
  return result;
};

export const whitespaceOnlyGen = (len: number): string => {
  return "".padEnd(len, " ");
};

export const durationgGen = (config: {
  hours: {
    min: number;
    max: number;
  };
  minutes: {
    min: number;
    max: number;
  };
  seconds: {
    min: number;
    max: number;
  };
}): string => {
  return `0${faker.datatype.number({
    min: config.hours.min,
    max: config.hours.max,
  })}${faker.datatype.number({
    min: config.minutes.min,
    max: config.minutes.max,
  })}${faker.datatype.number({
    min: config.seconds.min,
    max: config.seconds.max,
  })}`;
};

export const personNameGen = (config: {
  firstName: boolean;
  lastName: boolean;
}): string => {
  return `${config.firstName === true ? faker.name.firstName() : ""} ${
    config.lastName === true ? faker.name.lastName() : ""
  }`.trim();
};
