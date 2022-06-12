import { Button, Paper, Box, Grid } from "@mui/material";
import { CreateFormContext } from "./contexts/FormContext";
import React, { useContext, useState, useEffect } from "react";
import HdrForm from "./forms/HdrForm";
import DndContainer from "./components/DndContainer";
import DndTag from "./components/DndTag";
import { recordStringGen } from "./utils/recordStringGen";
import { Expandable } from "./components/Expandable";
import GroupContainer from "./components/GroupContainer";

function App() {
  const { hdr, groups } = useContext(CreateFormContext);

  console.log("groups", groups);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let dataToProcess = recordStringGen(hdr);

    for (const { grh, grt, alt, nwr, ind, ins } of groups) {
      dataToProcess += recordStringGen(grh);
      dataToProcess += !!nwr ? recordStringGen(nwr) : "";
      dataToProcess += !!alt ? recordStringGen(alt) : "";
      dataToProcess += !!ind ? recordStringGen(ind) : "";
      dataToProcess += !!ins ? recordStringGen(ins) : "";
      dataToProcess += recordStringGen(grt);
    }

    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + dataToProcess
    );
    element.setAttribute("download", "test.V21");

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  };

  // const groupBuilder = (groupNumber: number): JSX.Element[] => {
  //   console.log("groupBuilder", groupNumber);
  //   const groupElems = [] as JSX.Element[];
  //   if (!groupNumber) return groupElems;

  //   for (let index = 0; index < groupNumber; index++) {
  //     groupElems.push(
  //       <GroupContainer
  //         groupIndex={index}
  //         activeGroupsCount={activeGroupsCount}
  //         activeAltCount={activeAltCount}
  //         activeNwrCount={activeNwrCount}
  //         activeIndCount={activeIndCount}
  //         key={index}
  //       />
  //     );
  //   }
  //   console.log("groupElems", groupElems);
  //   return groupElems;
  // };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <Paper>
            <DndContainer allowedDropEffect="copy" />
            <form onSubmit={submitHandler}>
              <Expandable
                title="Add Transmission Header"
                name="fileHeader"
                element={<HdrForm />}
              />
              {groups.map((group, index) => {
                return (
                  <GroupContainer
                    groupIndex={index}
                    totalGroups={groups.length}
                    key={index}
                  />
                );
              })}

              <Button type="submit" variant="contained" color="primary">
                save
              </Button>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper>
            <Box sx={{ border: "1px dashed #888", height: 400 }}>
              <DndTag name="NEW GROUP" />
              <DndTag name="ALT" />
              <DndTag name="HDR" />
              <DndTag name="INS" />
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
