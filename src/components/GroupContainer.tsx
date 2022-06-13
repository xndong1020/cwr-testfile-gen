import React, { useContext } from "react";
import { CreateFormContext } from "../contexts/FormContext";

import NwrForm from "../forms/NwrForm";
import GrtForm from "../forms/GrtForm";
import GrhForm from "../forms/GrhForm";
import IndForm from "../forms/IndForm";
import AltForm from "../forms/AltForm";
import { Expandable } from "../components/Expandable";
import InsForm from "../forms/InsForm";

interface IGroupContainerProps {
  groupIndex: number;
  totalGroups: number;
}

const GroupContainer = ({ groupIndex, totalGroups }: IGroupContainerProps) => {
  const { groups } = useContext(CreateFormContext);

  const { nwr, alt, ind, ins } = groups[groupIndex];

  const recordCount = Object.entries(groups[groupIndex])
    .filter(([key, val]) => !!val && !["grh", "grt"].includes(key))
    .reduce((acc, val) => {
      acc += 1;
      return acc;
    }, 0);

  return (
    <>
      {!!totalGroups && (
        <GrhForm groupId={groupIndex} batchRequest={totalGroups} />
      )}
      {!!nwr && (
        <Expandable
          title="Add NWR Record"
          name="nwrRecord"
          element={<NwrForm transactionSeq={0} recordSeq={1} />}
        />
      )}

      {!!alt && (
        <Expandable
          title="Add ALT Record"
          name="altRecord"
          element={<AltForm />}
        />
      )}

      {!!ind && (
        <Expandable
          title="Add IND Record"
          name="indRecord"
          element={<IndForm />}
        />
      )}

      {!!ins && (
        <Expandable
          title="Add INS Record"
          name="insRecord"
          element={<InsForm />}
        />
      )}

      {!!totalGroups && (
        <GrtForm
          groupId={groupIndex}
          transactionCount={totalGroups}
          recordCount={recordCount}
        />
      )}
    </>
  );
};

export default GroupContainer;
