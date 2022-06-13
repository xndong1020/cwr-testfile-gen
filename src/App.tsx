import { Button, Paper, Box, Grid, Dialog, DialogTitle } from "@mui/material";
import { CreateFormContext } from "./contexts/FormContext";
import React, { useContext, useState, useEffect } from "react";
import HdrForm from "./forms/HdrForm";
import DndContainer from "./components/DndContainer";
import DndTag from "./components/DndTag";
import { recordStringGen } from "./utils/recordStringGen";
import { Expandable } from "./components/Expandable";
import GroupContainer from "./components/GroupContainer";
import TrlForm from "./forms/TrlForm";
import { Html } from "@mui/icons-material";

function App() {
  const [open, setOpen] = useState(false);
  const { hdr, groups, trl } = useContext(CreateFormContext);

  const genData = (newLineChar: string): string => {
    let dataToProcess = recordStringGen(hdr, newLineChar);

    for (const { grh, grt, transactions } of groups) {
      dataToProcess += recordStringGen(grh, newLineChar);

      for (const { alt, nwr, ind, ins } of transactions) {
        dataToProcess += !!nwr ? recordStringGen(nwr, newLineChar) : "";
        dataToProcess += !!alt ? recordStringGen(alt, newLineChar) : "";
        dataToProcess += !!ind ? recordStringGen(ind, newLineChar) : "";
        dataToProcess += !!ins ? recordStringGen(ins, newLineChar) : "";
      }

      dataToProcess += recordStringGen(grt, newLineChar);
    }

    dataToProcess += recordStringGen(trl, newLineChar);
    return dataToProcess;
  };

  const handleToggleDialog = () => {
    setOpen((prev) => {
      return !prev;
    });
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + genData("\n")
    );
    element.setAttribute("download", "test.V21");

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  };

  const handlePreview = () => {
    handleToggleDialog();
  };

  return (
    <>
      <Dialog
        onClose={handleToggleDialog}
        open={open}
        fullScreen
        sx={{ width: "90%" }}
      >
        <DialogTitle>Preview File</DialogTitle>
        <div dangerouslySetInnerHTML={{ __html: genData("<br />") }} />
      </Dialog>
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
                  sx={{ backgroundColor: "pink" }}
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

                <TrlForm sx={{ backgroundColor: "pink" }} />
                <br />
                <br />

                <Button
                  type="button"
                  variant="contained"
                  color="warning"
                  onClick={handlePreview}
                  sx={{ marginRight: "10px" }}
                >
                  Preview
                </Button>

                <Button type="submit" variant="contained" color="success">
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
