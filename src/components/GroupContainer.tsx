import NwrForm from "../forms/NwrForm";
import GrtForm from "../forms/GrtForm";
import GrhForm from "../forms/GrhForm";
import IndForm from "../forms/IndForm";
import AltForm from "../forms/AltForm";
import { Expandable } from "../components/Expandable";

interface IGroupContainerProps {
  groupIndex: number;
  activeNwrCount: number;
  activeAltCount: number;
  activeIndCount: number;
  activeGroupsCount: number;
}

const GroupContainer = ({
  groupIndex,
  activeNwrCount,
  activeAltCount,
  activeIndCount,
  activeGroupsCount,
}: IGroupContainerProps) => {
  return (
    <>
      {!!groupIndex && (
        <GrhForm groupId={groupIndex} batchRequest={activeGroupsCount} />
      )}
      {!!activeNwrCount && (
        <Expandable
          title="Add NWR Record"
          name="nwrRecord"
          element={<NwrForm type={"NWR"} transactionSeq={0} recordSeq={1} />}
        />
      )}

      {!!activeAltCount && (
        <Expandable
          title="Add ALT Record"
          name="altRecord"
          element={<AltForm />}
        />
      )}

      {!!activeIndCount && (
        <Expandable
          title="Add IND Record"
          name="intRecord"
          element={<IndForm />}
        />
      )}
      {!!groupIndex && (
        <GrtForm
          groupId={groupIndex}
          transactionCount={activeGroupsCount}
          recordCount={activeAltCount + activeNwrCount + activeIndCount}
        />
      )}
    </>
  );
};

export default GroupContainer;
