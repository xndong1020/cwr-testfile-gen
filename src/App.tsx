import { Button, Paper, Box, Grid } from "@mui/material";
import { CreateFormContext } from "./contexts/FormContext";
import React, { useContext, useState, useEffect } from "react";
import HdrForm from "./forms/HdrForm";
import DndContainer from "./components/DndContainer";
import DndTag from "./components/DndTag";
import { CreateTagContext } from "./contexts/TagContext";
import { recordStringGen } from "./utils/recordStringGen";
import { Expandable } from "./components/Expandable";
import GroupContainer from "./components/GroupContainer";

function App() {
  const { nwr, hdr, grh, grt, ind, alt } = useContext(CreateFormContext);
  const {
    activeHdrCount,
    activeAltCount,
    activeNwrCount,
    activeIndCount,
    activeGroupsCount,
  } = useContext(CreateTagContext);

  console.log("activeGroupsCount", activeGroupsCount);

  const [groupNumber, setGroupNumber] = useState(0);

  useEffect(() => {
    const createGroups = (activeGroupsCount: number) => {
      setGroupNumber(activeGroupsCount);
    };
    createGroups(activeGroupsCount);
  }, [activeGroupsCount]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," +
        recordStringGen(hdr) +
        recordStringGen(grh) +
        recordStringGen(nwr) +
        recordStringGen(alt) +
        recordStringGen(ind) +
        recordStringGen(grt, true)
    );
    element.setAttribute("download", "test.V21");

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  };

  const groupBuilder = (groupNumber: number): JSX.Element[] => {
    console.log("groupBuilder", groupNumber);
    const groupElems = [] as JSX.Element[];
    if (!groupNumber) return groupElems;

    for (let index = 0; index < groupNumber; index++) {
      groupElems.push(
        <GroupContainer
          groupIndex={index}
          activeGroupsCount={activeGroupsCount}
          activeAltCount={activeAltCount}
          activeNwrCount={activeNwrCount}
          activeIndCount={activeIndCount}
          key={index}
        />
      );
    }
    console.log("groupElems", groupElems);
    return groupElems;
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <Paper>
            <DndContainer allowedDropEffect="copy" />
            <form onSubmit={submitHandler}>
              {!!activeHdrCount && (
                <Expandable
                  title="Add Transmission Header"
                  name="fileHeader"
                  element={<HdrForm />}
                />
              )}
              {/* {[...Array(groupNumber)].map((_, index) => {
                return (
                  <GroupContainer
                    groupIndex={index}
                    activeGroupsCount={index}
                    activeAltCount={index}
                    activeNwrCount={index}
                    activeIndCount={index}
                    key={index}
                  />
                );
              })} */}
              <br />
              <GroupContainer
                groupIndex={1}
                activeGroupsCount={activeGroupsCount}
                activeAltCount={activeAltCount}
                activeNwrCount={activeNwrCount}
                activeIndCount={activeIndCount}
                key={1}
              />
              <Button type="submit" variant="contained" color="primary">
                save
              </Button>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper>
            <Box sx={{ border: "1px dashed #888", height: 400 }}>
              <DndTag name="GRH" />
              <DndTag name="GRT" />
              <DndTag name="ALT" />
              <DndTag name="HDR" />
              <DndTag name="IND" />
              <DndTag name="NWR" />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
