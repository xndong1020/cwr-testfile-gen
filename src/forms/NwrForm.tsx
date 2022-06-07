import React, { useCallback, useState, useContext } from "react";
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Typography,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
} from "@mui/material";
import {
  dateGen,
  durationgGen,
  numericOnlyGen,
  personNameGen,
  wordsGen,
  whitespaceOnlygGen,
} from "../utils/dummyDataGenerators";
import {
  booleanValueGen,
  compositeTypeKeyGen,
  cwrWorkTypeKenGen,
  excerptTypeKenGen,
  languageKeyGen,
  lyricAdaptationKenGen,
  musicalWorkDistributionCategoryKeyGen,
  musicArrangementKenGen,
  textMusicRelationshipKeyGen,
  versionTypeKeyGen,
} from "../utils/referenceTableKeyGenerator";
import { NwrFieldsLength } from "../configurations/NwrFormConfig";
import { CreateFormContext } from "../contexts/FormContext";

export interface INwrForm {
  "record-type": string;
  "transaction-sequence-number": string;
  "record-sequence-number": string;
  "work-title": string;
  "language-code": string;
  "submitter-work": string;
  iswc: string;
  "copyright-date": string;
  "copyright-number": string;
  "musical-work-distribution": string;
  "category-duration": string;
  "recorded-indicator": string;
  "text-music-relationship": string;
  "relationship-composite-type": string;
  "version-type": string;
  "excerpt-type": string;
  "music-arrangement": string;
  "lyric-adaptation": string;
  "contact-name": string;
  "contact-id": string;
  "cwr-work-type": string;
  "grand-rights-ind": string;
  "composite-component-count": string;
  "date-of-publication-of-printed-edition": string;
  "exceptional-clause": string;
  "opus-number": string;
  "catalogue-number": string;
  "priority-flag": string;
}

export const initNwrForm = {
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

interface NwrFormProps {
  transactionSeq: number;
  recordSeq: number;
}

const NwrForm = ({ transactionSeq, recordSeq }: NwrFormProps) => {
  const [nwrForm, setForm] = useState<INwrForm>(initNwrForm);
  const { handleUpdateNrwForm } = useContext(CreateFormContext);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { id, value } = e.target;
      setForm((prev) => {
        return {
          ...prev,
          [id]: value,
        };
      });
    },
    []
  );

  const handleRadioButtonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(" e.target.value", e.target.value);
    setForm((prev) => {
      return {
        ...prev,
        "record-type": e.target.value,
      };
    });
  };

  const handleGenerateNrw = (requiredFieldsOnly: boolean = false) => {
    const dummyNrw: INwrForm = {
      ...nwrForm,
      "transaction-sequence-number": ("" + transactionSeq).padStart(8, "0"),
      "record-sequence-number": ("" + recordSeq).padStart(8, "0"),
      "work-title": wordsGen().toUpperCase(),
      "language-code": requiredFieldsOnly
        ? whitespaceOnlygGen(NwrFieldsLength["language-code"].length)
        : languageKeyGen(),
      "submitter-work": numericOnlyGen(),
      iswc: requiredFieldsOnly
        ? whitespaceOnlygGen(NwrFieldsLength["iswc"].length)
        : numericOnlyGen(NwrFieldsLength["iswc"].length),
      "copyright-date": requiredFieldsOnly
        ? whitespaceOnlygGen(NwrFieldsLength["copyright-date"].length)
        : dateGen(),
      "copyright-number": requiredFieldsOnly
        ? whitespaceOnlygGen(NwrFieldsLength["copyright-number"].length)
        : numericOnlyGen(NwrFieldsLength["copyright-number"].length),
      "musical-work-distribution": musicalWorkDistributionCategoryKeyGen(),
      "category-duration": requiredFieldsOnly
        ? whitespaceOnlygGen(NwrFieldsLength["category-duration"].length)
        : durationgGen({
            hours: { min: 0, max: 9 },
            minutes: { min: 0, max: 60 },
            seconds: { min: 0, max: 60 },
          }),
      "recorded-indicator": "U",
      "text-music-relationship": requiredFieldsOnly
        ? whitespaceOnlygGen(NwrFieldsLength["text-music-relationship"].length)
        : textMusicRelationshipKeyGen(),
      "relationship-composite-type": requiredFieldsOnly
        ? whitespaceOnlygGen(
            NwrFieldsLength["relationship-composite-type"].length
          )
        : compositeTypeKeyGen(),
      "version-type": versionTypeKeyGen(),
      "excerpt-type": requiredFieldsOnly
        ? whitespaceOnlygGen(NwrFieldsLength["excerpt-type"].length)
        : excerptTypeKenGen(),
      "music-arrangement": requiredFieldsOnly
        ? whitespaceOnlygGen(NwrFieldsLength["music-arrangement"].length)
        : musicArrangementKenGen(),
      "lyric-adaptation": requiredFieldsOnly
        ? whitespaceOnlygGen(NwrFieldsLength["lyric-adaptation"].length)
        : lyricAdaptationKenGen(),
      "contact-name": requiredFieldsOnly
        ? whitespaceOnlygGen(NwrFieldsLength["contact-name"].length)
        : personNameGen({ firstName: true, lastName: true }).toUpperCase(),
      "contact-id": requiredFieldsOnly
        ? whitespaceOnlygGen(NwrFieldsLength["contact-id"].length)
        : numericOnlyGen(NwrFieldsLength["contact-id"].length),
      "cwr-work-type": requiredFieldsOnly
        ? whitespaceOnlygGen(NwrFieldsLength["cwr-work-type"].length)
        : cwrWorkTypeKenGen(),
      "grand-rights-ind": requiredFieldsOnly
        ? whitespaceOnlygGen(NwrFieldsLength["grand-rights-ind"].length)
        : booleanValueGen(),
      "composite-component-count": requiredFieldsOnly
        ? whitespaceOnlygGen(
            NwrFieldsLength["composite-component-count"].length
          )
        : numericOnlyGen(NwrFieldsLength["composite-component-count"].length),
      "date-of-publication-of-printed-edition": requiredFieldsOnly
        ? whitespaceOnlygGen(
            NwrFieldsLength["date-of-publication-of-printed-edition"].length
          )
        : dateGen(),
      "exceptional-clause": requiredFieldsOnly
        ? whitespaceOnlygGen(NwrFieldsLength["exceptional-clause"].length)
        : booleanValueGen(),
      "opus-number": requiredFieldsOnly
        ? whitespaceOnlygGen(NwrFieldsLength["opus-number"].length)
        : numericOnlyGen(NwrFieldsLength["opus-number"].length),
      "catalogue-number": requiredFieldsOnly
        ? whitespaceOnlygGen(NwrFieldsLength["catalogue-number"].length)
        : numericOnlyGen(NwrFieldsLength["catalogue-number"].length),
      "priority-flag": requiredFieldsOnly
        ? whitespaceOnlygGen(NwrFieldsLength["priority-flag"].length)
        : booleanValueGen(),
    };
    setForm(dummyNrw);
    handleUpdateNrwForm(dummyNrw);
  };

  return (
    <>
      <FormControl>
        <FormLabel id="record-type-label">Record Type</FormLabel>
        <RadioGroup
          row
          aria-labelledby="record-type-label"
          value={nwrForm["record-type"]}
          name="radio-buttons-group"
          onChange={handleRadioButtonChange}
        >
          <FormControlLabel value="NWR" control={<Radio />} label="NWR" />
          <FormControlLabel value="REV" control={<Radio />} label="REV" />
        </RadioGroup>
      </FormControl>
      <br />
      <FormControl>
        <InputLabel htmlFor="work-title">Work Title</InputLabel>
        <Input
          id="work-title"
          aria-describedby="work-title-helper-text"
          value={nwrForm["work-title"]}
          onChange={handleInputChange}
          inputProps={{ maxLength: 60 }}
        />
        <FormHelperText id="work-title-helper-text">
          Name/Title of the work. (Size: 60)
        </FormHelperText>
      </FormControl>
      <br />
      <FormControl>
        <InputLabel htmlFor="language-code">Language Code</InputLabel>
        <Input
          id="language-code"
          aria-describedby="language-code-helper-text"
          value={nwrForm["language-code"]}
          onChange={handleInputChange}
          inputProps={{ maxLength: 2 }}
        />
        <FormHelperText id="language-code-helper-text">
          The code representing the language of this title. These values reside
          in the Language Code Table. (Size: 2)
        </FormHelperText>
      </FormControl>
      <br />
      <FormControl>
        <InputLabel htmlFor="submitter-work">Submitter Work</InputLabel>
        <Input
          id="submitter-work"
          aria-describedby="submitter-work-helper-text"
          value={nwrForm["submitter-work"]}
          onChange={handleInputChange}
          inputProps={{ maxLength: 14 }}
        />
        <FormHelperText id="submitter-work-helper-text">
          Number assigned to the work by the publisher submitting or receiving
          the file. This number must be unique for the publisher. (Size: 14)
        </FormHelperText>
      </FormControl>
      <br />
      <FormControl>
        <InputLabel htmlFor="iswc">ISWC</InputLabel>
        <Input
          id="iswc"
          aria-describedby="iswc-helper-text"
          value={nwrForm["iswc"]}
          onChange={handleInputChange}
          inputProps={{ maxLength: 11 }}
        />
        <FormHelperText id="iswc-helper-text">
          The International Standard Work Code assigned to this work. (Size: 11)
        </FormHelperText>
      </FormControl>
      <br />
      <FormControl>
        <InputLabel htmlFor="copyright-date">Copyright Date</InputLabel>
        <Input
          id="copyright-date"
          aria-describedby="copyright-date-helper-text"
          value={nwrForm["copyright-date"]}
          onChange={handleInputChange}
          inputProps={{ maxLength: 8 }}
        />
        <FormHelperText id="copyright-date-helper-text">
          Original copyright date of the work. (Size: 8)
        </FormHelperText>
      </FormControl>
      <br />
      <FormControl>
        <InputLabel htmlFor="copyright-number">Copyright Number</InputLabel>
        <Input
          id="copyright-number"
          aria-describedby="copyright-number-helper-text"
          value={nwrForm["copyright-number"]}
          onChange={handleInputChange}
          inputProps={{ maxLength: 12 }}
        />
        <FormHelperText id="copyright-number-helper-text">
          Original copyright number of the work. (Size: 12)
        </FormHelperText>
      </FormControl>
      <br />
      <FormControl>
        <InputLabel htmlFor="musical-work-distribution">
          Musical Work Distribution
        </InputLabel>
        <Input
          id="musical-work-distribution"
          aria-describedby="musical-work-distribution-helper-text"
          value={nwrForm["musical-work-distribution"]}
          onChange={handleInputChange}
          inputProps={{ maxLength: 3 }}
        />
        <FormHelperText id="musical-work-distribution-helper-text">
          Describes the type of music as it applies to special distribution
          rules. Values for this field reside in the Musical Work Distribution
          Category Table. (Size: 3)
        </FormHelperText>
      </FormControl>
      <br />
      <FormControl>
        <InputLabel htmlFor="category-duration">Category Duration</InputLabel>
        <Input
          id="category-duration"
          aria-describedby="category-duration-helper-text"
          value={nwrForm["category-duration"]}
          onChange={handleInputChange}
          inputProps={{ maxLength: 6 }}
        />
        <FormHelperText id="category-duration-helper-text">
          Duration of the work in hours, minutes, and seconds. This field must
          be greater than zero if Musical Work Distribution Category is equal to
          SER. Note that some societies may also require duration for works
          where the Musical Work Distribution Category is equal to JAZ (e.g.
          BMI). (Size: 6)
        </FormHelperText>
      </FormControl>
      <br />
      <FormControl>
        <InputLabel htmlFor="recorded-indicator">Recorded Indicator</InputLabel>
        <Input
          id="recorded-indicator"
          aria-describedby="recorded-indicator-helper-text"
          value={nwrForm["recorded-indicator"]}
          onChange={handleInputChange}
          inputProps={{ maxLength: 1 }}
        />
        <FormHelperText id="recorded-indicator-helper-text">
          Indicates whether or not the work has ever been recorded. (Size: 1)
        </FormHelperText>
      </FormControl>
      <br />
      <FormControl>
        <InputLabel htmlFor="text-music-relationship">
          Text Music Relationship
        </InputLabel>
        <Input
          id="text-music-relationship"
          aria-describedby="text-music-relationship-helper-text"
          value={nwrForm["text-music-relationship"]}
          onChange={handleInputChange}
          inputProps={{ maxLength: 3 }}
        />
        <FormHelperText id="text-music-relationship-helper-text">
          Indicates whether this work contains music, text, and/or both. Values
          reside in the Text Music Relationship Table. (Size: 3)
        </FormHelperText>
      </FormControl>
      <br />
      <FormControl>
        <InputLabel htmlFor="relationship-composite-type">
          Relationship Composite Type
        </InputLabel>
        <Input
          id="relationship-composite-type"
          aria-describedby="relationship-composite-type-helper-text"
          value={nwrForm["relationship-composite-type"]}
          onChange={handleInputChange}
          inputProps={{ maxLength: 3 }}
        />
        <FormHelperText id="relationship-composite-type-helper-text">
          If this is a composite work, this field will indicate the type of
          composite. Values reside in the Composite Type Table. (Size: 3)
        </FormHelperText>
      </FormControl>
      <br />
      <FormControl>
        <InputLabel htmlFor="version-type">Version Type</InputLabel>
        <Input
          id="version-type"
          aria-describedby="version-type-helper-text"
          value={nwrForm["version-type"]}
          onChange={handleInputChange}
          inputProps={{ maxLength: 3 }}
        />
        <FormHelperText id="version-type-helper-text">
          Indicates relationships between this work and other works. Note that
          this field is used to indicate whether or not this work is an
          arrangement. Values reside in the Version Type Table. (Size: 3)
        </FormHelperText>
      </FormControl>
      <br />

      <FormControl>
        <InputLabel htmlFor="excerpt-type">Excerpt Type</InputLabel>
        <Input
          id="excerpt-type"
          aria-describedby="excerpt-type-helper-text"
          value={nwrForm["excerpt-type"]}
          onChange={handleInputChange}
          inputProps={{ maxLength: 3 }}
        />
        <FormHelperText id="excerpt-type-helper-text">
          If this is an excerpt, this field will indicate the type of excerpt.
          Values reside in the Excerpt Type Table. (Size: 3)
        </FormHelperText>
      </FormControl>
      <br />

      <FormControl>
        <InputLabel htmlFor="music-arrangement">Music Arrangement</InputLabel>
        <Input
          id="music-arrangement"
          aria-describedby="music-arrangement-helper-text"
          value={nwrForm["music-arrangement"]}
          onChange={handleInputChange}
          inputProps={{ maxLength: 3 }}
        />
        <FormHelperText id="music-arrangement-helper-text">
          If Version Type is equal to “MOD”, this field indicates the type of
          music arrangement. Values reside in the Music Arrangement Table.
          (Size: 3)
        </FormHelperText>
      </FormControl>
      <br />

      <FormControl>
        <InputLabel htmlFor="lyric-adaptation">Lyric Adaptation</InputLabel>
        <Input
          id="lyric-adaptation"
          aria-describedby="lyric-adaptation-helper-text"
          value={nwrForm["lyric-adaptation"]}
          onChange={handleInputChange}
          inputProps={{ maxLength: 3 }}
        />
        <FormHelperText id="lyric-adaptation-helper-text">
          If Version Type is equal to “MOD”, this field indicates the type of
          lyric adaptation. Values reside in the Lyric Adaptation Table. (Size:
          3)
        </FormHelperText>
      </FormControl>
      <br />

      <FormControl>
        <InputLabel htmlFor="contact-name">Contact Name</InputLabel>
        <Input
          id="contact-name"
          aria-describedby="contact-name-helper-text"
          value={nwrForm["contact-name"]}
          onChange={handleInputChange}
          inputProps={{ maxLength: 30 }}
        />
        <FormHelperText id="contact-name-helper-text">
          The name of a business contact person at the organization that
          originated this transaction. (Size: 30)
        </FormHelperText>
      </FormControl>
      <br />

      <FormControl>
        <InputLabel htmlFor="contact-id">Contact Id</InputLabel>
        <Input
          id="contact-id"
          aria-describedby="contact-id-helper-text"
          value={nwrForm["contact-id"]}
          onChange={handleInputChange}
          inputProps={{ maxLength: 10 }}
        />
        <FormHelperText id="contact-id-helper-text">
          An identifier associated with the contact person at the organization
          that originated this transaction. (Size: 10)
        </FormHelperText>
      </FormControl>
      <br />

      <FormControl>
        <InputLabel htmlFor="cwr-work-type">Cwr Work Type</InputLabel>
        <Input
          id="cwr-work-type"
          aria-describedby="cwr-work-type-helper-text"
          value={nwrForm["cwr-work-type"]}
          onChange={handleInputChange}
          inputProps={{ maxLength: 30 }}
        />
        <FormHelperText id="cwr-work-type-helper-text">
          These values reside in the CWR Work Type table. (Size: 30)
        </FormHelperText>
      </FormControl>
      <br />

      <FormControl>
        <InputLabel htmlFor="grand-rights-ind">Grand Rights Ind</InputLabel>
        <Input
          id="grand-rights-ind"
          aria-describedby="grand-rights-ind-helper-text"
          value={nwrForm["grand-rights-ind"]}
          onChange={handleInputChange}
          inputProps={{ maxLength: 1 }}
        />
        <FormHelperText id="grand-rights-ind-helper-text">
          Indicates whether this work is originally intended for performance on
          stage. Note that this field is mandatory for registrations with the UK
          societies. (Size: 1)
        </FormHelperText>
      </FormControl>
      <br />

      <FormControl>
        <InputLabel htmlFor="composite-component-count">
          Composite Component Count
        </InputLabel>
        <Input
          id="composite-component-count"
          aria-describedby="composite-component-count-helper-text"
          value={nwrForm["composite-component-count"]}
          onChange={handleInputChange}
          inputProps={{ maxLength: 3 }}
        />
        <FormHelperText id="composite-component-count-helper-text">
          If Composite Type is entered, this field represents the number of
          components contained in this composite. Note that this is required for
          composite works where ASCAP is represented on the work. (Size: 3)
        </FormHelperText>
      </FormControl>
      <br />
      <br />

      <Typography variant="h6">Additional Fields for Version 2.0</Typography>

      <br />
      <br />

      <FormControl>
        <InputLabel htmlFor="date-of-publication-of-printed-edition">
          Date Of Publication Of Printed Edition
        </InputLabel>
        <Input
          id="date-of-publication-of-printed-edition"
          aria-describedby="date-of-publication-of-printed-edition-helper-text"
          value={nwrForm["date-of-publication-of-printed-edition"]}
          onChange={handleInputChange}
          inputProps={{ maxLength: 8 }}
        />
        <FormHelperText id="date-of-publication-of-printed-edition-helper-text">
          For registrations with GEMA: Indicates the date that the printed, new
          edition published by the submitting publisher appeared. This
          information is especially relevant for the notification of
          sub-published works by GEMA-sub- publishers. (Size: 8)
        </FormHelperText>
      </FormControl>
      <br />

      <FormControl>
        <InputLabel htmlFor="exceptional-clause">Exceptional Clause</InputLabel>
        <Input
          id="exceptional-clause"
          aria-describedby="exceptional-clause-helper-text"
          value={nwrForm["exceptional-clause"]}
          onChange={handleInputChange}
          inputProps={{ maxLength: 1 }}
        />
        <FormHelperText id="exceptional-clause-helper-text">
          For registrations with GEMA: By entering Y (Yes), the submitting
          GEMA-sub-publisher declares that the exceptional clause of the GEMA
          distribution rules with regard to printed editions applies
          (GEMA-Verteilungsplan A Anhang III).. (Size: 1)
        </FormHelperText>
      </FormControl>
      <br />
      <br />

      <Typography variant="h6">
        Society Specific Fields for Version 2.0
      </Typography>

      <br />
      <br />

      <FormControl>
        <InputLabel htmlFor="opus-number">Opus Number</InputLabel>
        <Input
          id="opus-number"
          aria-describedby="opus-number-helper-text"
          value={nwrForm["opus-number"]}
          onChange={handleInputChange}
          inputProps={{ maxLength: 25 }}
        />
        <FormHelperText id="opus-number-helper-text">
          Indicates the number assigned to this work, usually by the composer.
          Part numbers are to be added with an # e.g. 28#3 (meaning Opus 28 part
          3). (Size: 25)
        </FormHelperText>
      </FormControl>
      <br />

      <FormControl>
        <InputLabel htmlFor="catalogue-number">Catalogue Number</InputLabel>
        <Input
          id="catalogue-number"
          aria-describedby="catalogue-number-helper-text"
          value={nwrForm["catalogue-number"]}
          onChange={handleInputChange}
          inputProps={{ maxLength: 25 }}
        />
        <FormHelperText id="catalogue-number-helper-text">
          The work catalogue number. The abbreviated name of the catalogue is to
          be added (like BWV, KV), without dots. Part numbers are to be added
          with an # e.g. KV 297#1 (meaning Köchel Verzeichnis Nr.297 part 1)
          (meaning Opus 28 part 3). (Size: 25)
        </FormHelperText>
      </FormControl>
      <br />

      <br />
      <br />

      <Typography variant="h6">
        Society Specific Fields for Version 2.0
      </Typography>

      <br />
      <br />
      <FormControl>
        <InputLabel htmlFor="priority-flag">Priority Flag</InputLabel>
        <Input
          id="priority-flag"
          aria-describedby="priority-flag-helper-text"
          value={nwrForm["priority-flag"]}
          onChange={handleInputChange}
          inputProps={{ maxLength: 1 }}
        />
        <FormHelperText id="priority-flag-helper-text">
          Indicates that this work should be processed faster because it is on
          the charts, is by a well-known composer, etc. (Size: 1)
        </FormHelperText>
      </FormControl>
      <br />
      <Button
        variant="contained"
        color="success"
        onClick={() => handleGenerateNrw()}
        sx={{
          paddingRight: 20,
        }}
      >
        Generate All Fields
      </Button>

      <Button
        variant="contained"
        color="error"
        onClick={() => handleGenerateNrw(true)}
      >
        Generate Required Fields Only
      </Button>
    </>
  );
};

export default NwrForm;
