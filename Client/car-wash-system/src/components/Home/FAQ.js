import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";

const labels = [
  {
    ques: "How to book my car service with WYPE?",
    ans:
      "You can book your car service in just 3 easy steps. First, select your car’s make, model and, then finally choose the service package, and that’s it! You have just booked your car service.",
  },

  {
    ques: " How often do I really need to get my car serviced? ",
    ans:
      "Your car should be serviced every 6 months or every 10,000 kms whichever comes first.General service is highly recommended to help keep your car running smoothy and hassle free.",
  },
  {
    ques: "Which oil do you use for servicing?",
    ans: "We use manufacturer recommended grade of Shell Engine Oil.",
  },
  {
    ques: " What is the warranty that WYPE offers? ",
    ans:
      "WYPE offers a colour match warranty as well as 1 year paint fade warranty in the denting paintion work carried out at WYPE certified garage.",
  },
  {
    ques: "How is WYPE different from other similar services providers?",
    ans:
      "WYPE offers the best car services at the best prices availablE. Not only do you get a wide variety of car services to choose from. You also save up to 40% compared to what is charged at authorised service centres and service providers.",
  },
  {
    ques: "Do you offer car sanitization and disinfection service?",
    ans:
      "Yes, we do. Our car interior care service takes care of any bio-hazards that may be lurking in your car. We use industry-grade disinfectants to comprehensively clean and sanitize your car. Your safety is our priority.",
  },
  {
    ques: "What if I am not satisfied with my car service?",
    ans:
      "100% gratification is our idea of customer satisfaction. We offer a network warranty of 1 month or 1000 kms (whichever comes first) on our car services. You can redeem this warranty at any of our workshops.",
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
    marginTop: "100px",
    marginLeft: "140px",
  },
  head: {
    background: "#EAEAEA",
  },
  heading: {
    fontWeight: "bold",
  },
}));

export default function FAQ() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1>Frequently Asked Questions</h1>
      <br />
      {labels.map((label) => (
        <Accordion>
          <AccordionSummary
            expandIcon={<AddIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            className={classes.head}
          >
            <Typography className={classes.heading}>{label.ques}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{label.ans}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
