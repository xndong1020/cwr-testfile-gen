import { Button, Paper, Box, Grid } from "@mui/material";
import { CreateFormContext } from "./contexts/FormContext";
import React, { useContext, useState, useEffect } from "react";
import HdrForm from "./forms/HdrForm";
import DndContainer from "./components/DndContainer";
import DndTag from "./components/DndTag";
import { recordStringGen } from "./utils/recordStringGen";
import { Expandable } from "./components/Expandable";
import GroupContainer from "./components/GroupContainer";
import TrlForm from "./forms/TrlForm";

function App() {
  const { hdr, groups, trl } = useContext(CreateFormContext);

  console.log("groups", groups);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let dataToProcess = recordStringGen(hdr);

    for (const { grh, grt, transactions } of groups) {
      dataToProcess += recordStringGen(grh);

      for (const { alt, nwr, ind, ins } of transactions) {
        dataToProcess += !!nwr ? recordStringGen(nwr) : "";
        dataToProcess += !!alt ? recordStringGen(alt) : "";
        dataToProcess += !!ind ? recordStringGen(ind) : "";
        dataToProcess += !!ins ? recordStringGen(ins) : "";
      }

      dataToProcess += recordStringGen(grt);
    }

    dataToProcess += recordStringGen(trl);

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

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <DndContainer allowedDropEffect="copy" />
          <Paper>
            <Box>
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

                <br />
                <br />

                <TrlForm />
                <br />
                <br />

                <Button type="submit" variant="contained" color="primary">
                  save
                </Button>
              </form>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper>
            <Box sx={{ border: "1px dashed #888", height: 400 }}>
              <DndTag name="NEW GROUP" />
              <DndTag name="NEW TRANSACTION" />
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
