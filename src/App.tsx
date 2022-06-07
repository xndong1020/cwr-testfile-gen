import {
  Button,
  Paper,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NwrForm from "./forms/NwrForm";
import { CreateFormContext } from "./contexts/FormContext";
import React, { useContext } from "react";
import GrtForm from "./forms/GrtForm";
import GrhForm from "./forms/GrhForm";
import HdrForm from "./forms/HdrForm";

function App() {
  const { nwr, hdr, grh, grt } = useContext(CreateFormContext);
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
      <Paper>
        <form onSubmit={submitHandler}>
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
          <GrhForm groupId={1} batchRequest={1} />
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
          <GrtForm groupId={1} transactionCount={1} recordCount={1} />
          <br />
          <Button type="submit" variant="contained" color="primary">
            save
          </Button>
        </form>
      </Paper>
    </>
  );
}

export default App;
