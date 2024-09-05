/** External */
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PropTypes from "prop-types";

const AccordionMui = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummaryMui = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "rgba(0, 0, 0, .03)",
  //   flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
  ...theme.applyStyles("dark", {
    backgroundColor: "rgba(255, 255, 255, .05)",
  }),
}));

const AccordionDetailsMui = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const Accordion = ({ sections }) => {
  return (
    <>
      {sections.map((section, sectionIndex) => (
        <AccordionMui key={sectionIndex}>
          <AccordionSummaryMui
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel-${sectionIndex}-content`}
            id={`panel-${sectionIndex}-header`}
          >
            <Typography>{section.title}</Typography>
          </AccordionSummaryMui>
          <AccordionDetailsMui sx={{ padding: 0 }}>
            <List sx={{ padding: 0 }}>
              {section.videos.map((video, videoIndex) => (
                <div key={videoIndex}>
                  <ListItem
                    button
                    onClick={() => alert(`Selected: ${video.title}`)}
                  >
                    <ListItemText primary={video.title} />
                  </ListItem>
                  {videoIndex < section.videos.length - 1 && <Divider />}
                </div>
              ))}
            </List>
          </AccordionDetailsMui>
        </AccordionMui>
      ))}
    </>
  );
};

// Define prop types
Accordion.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired, // Section title
      videos: PropTypes.arrayOf(
        // Array of videos in the section
        PropTypes.shape({
          title: PropTypes.string.isRequired, // Each video must have a title
        })
      ).isRequired,
    })
  ).isRequired,
};

export default Accordion;
