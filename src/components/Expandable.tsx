import {
  Box,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@mui/material";
import React, { ReactNode } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HdrForm from "../forms/HdrForm";
import IFormBase from "../forms/IFormBase";

interface IExpandableProps {
  name: string;
  title: string;
  element: ReactNode;
}

export const Expandable = ({ name, title, element }: IExpandableProps) => {
  return (
    <Box>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`${name}-content`}
          id={`${name}-header`}
        >
          <Typography>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>{element}</AccordionDetails>
      </Accordion>
    </Box>
  );
};
