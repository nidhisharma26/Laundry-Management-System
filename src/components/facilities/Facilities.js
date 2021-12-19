import React from "react";
import { Grid, Typography } from "@material-ui/core";
import Card from "../card/Card";
import complaints from "../../assets/complaints.png";
import feedback from "../../assets/feedback.png";
import slip from "../../assets/slip.PNG";
import { Link } from "react-router-dom";
import pdf1 from "../../assets/feasibility.pdf";

const Facilities = () => {
  return (
    <>
      <Grid container justify="center" style={{ marginTop: "25vh" }}>
        <Grid item lg={10} md={10}>
          <Grid container justify="center" style={{ textAlign: "center" }}>
            <Grid item>
              <Typography variant="h2">Facilities</Typography>
            </Grid>
          </Grid>
          <Grid
            container
            lg={12}
            md={12}
            justify="center"
            style={{
              margin: "10vh 0 20vh 0",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Grid item lg={3} md={3}>
              {/* <Card
                head="Generate Slip"
                body="Here you can generate your slip digitally."
                image={slip}
              /> */}
              <a href="https://drive.google.com/file/d/1UQBNsIsezjg0SKpN_d1pQBgEmeQ73CWR/view?usp=sharing">
                <object width="100%" height="300" data={pdf1} />
              </a>
              <Typography
                variant="h6"
                style={{
                  color: "black",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Download Slip
              </Typography>
              <Typography
                variant="subtitle2"
                style={{ color: "black", textAlign: "center" }}
              >
                lorem ipsum blah blah blah
              </Typography>
            </Grid>
            <Grid item lg={3} md={3}>
              <Link to="/complaint">
                <Card
                  head="Make Complaints"
                  body="Here you can make your complaints of anything related to laundry."
                  image={complaints}
                />
              </Link>
            </Grid>
            <Grid item lg={3} md={3}>
              <Link to="/feedback">
                {" "}
                <Card
                  head="Submit Feedback"
                  body="The team would love to read your feedback on our services."
                  image={feedback}
                />
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Facilities;
