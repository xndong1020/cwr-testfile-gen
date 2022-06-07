import {
  Button,
  Paper,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Box,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NwrForm from "./forms/NwrForm";
import { CreateFormContext } from "./contexts/FormContext";
import React, { useContext } from "react";
import GrtForm from "./forms/GrtForm";
import GrhForm from "./forms/GrhForm";
import HdrForm from "./forms/HdrForm";
import DndContainer from "./components/DndContainer";
import DndTag from "./components/DndTag";
import { CreateTagContext } from "./contexts/TagContext";
import IndForm from "./forms/IndForm";

function App() {
  const { nwr, hdr, grh, grt, ind } = useContext(CreateFormContext);
  const { isNwrActive, isIndActive } = useContext(CreateTagContext);
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const grhString = Object.values(grh).reduce((accu, cur) => {
      accu += cur;
      return accu;
    }, "");
    const grtString = Object.values(grt).reduce((accu, cur) => {
      accu += cur;
      return accu;
    }, "");
    const hdrString = Object.values(hdr).reduce((accu, cur) => {
      accu += cur;
      return accu;
    }, "");
    const nwrString = Object.values(nwr).reduce((accu, cur) => {
      accu += cur;
      return accu;
    }, "");
    const indString = Object.values(ind).reduce((accu, cur) => {
      accu += cur;
      return accu;
    }, "");
    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," +
        hdrString +
        "\n" +
        grhString +
        "\n" +
        nwrString +
        "\n" +
        indString +
        "\n" +
        grtString
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
          <Paper>
            <form onSubmit={submitHandler}>
              {false && (
                <Box>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>Add Transmission Header</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <HdrForm />
                    </AccordionDetails>
                  </Accordion>
                </Box>
              )}
              <GrhForm groupId={1} batchRequest={1} />
              <DndContainer allowedDropEffect="copy" />
              {isNwrActive && (
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Add NWR/REV Record</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <NwrForm transactionSeq={0} recordSeq={1} />
                  </AccordionDetails>
                </Accordion>
              )}

              {isIndActive && (
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Add IND Record</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <IndForm />
                  </AccordionDetails>
                </Accordion>
              )}
              <GrtForm groupId={1} transactionCount={1} recordCount={1} />
              <br />
              <Button type="submit" variant="contained" color="primary">
                save
              </Button>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper>
            <Box sx={{ border: "1px dashed #888", height: 400 }}>
              <DndTag name="IND" />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
