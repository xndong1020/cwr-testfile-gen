export const HdrFormConfig: Record<
  string,
  {
    order: number;
    length: number;
  }
> = {
  "record-type": {
    order: 1,
    length: 3,
  },
  "sender-type": {
    order: 2,
    length: 2,
  },
  "sender-id": {
    order: 3,
    length: 6,
  },
  "sender-name": {
    order: 4,
    length: 45,
  },
  "edi-standard-version-number": {
    order: 5,
    length: 5,
  },
  "creation-date": {
    order: 6,
    length: 8,
  },
  "creation-time": {
    order: 7,
    length: 6,
  },
  "transmission-date": {
    order: 8,
    length: 8,
  },
  "character-set": {
    order: 9,
    length: 15,
  },
};
