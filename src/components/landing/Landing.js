import React from "react";
import Nav from "../nav/Nav";
import laundry from "./laundry.json";
import Lottie from "react-lottie";
import { useStyles } from "./LandingStyles";
import { Grid, Typography } from "@material-ui/core";
import Facilities from "../facilities/Facilities";

const Landing = () => {
  const classes = useStyles();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: laundry,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div>
      <Nav />
      <Grid
        container
        justify="center"
        style={{ minHeight: "80vh", backgroundColor: "#414141" }}
      >
        <Grid item lg={5} md={5} justify="center" style={{ margin: "auto" }}>
          <Typography variant="h2" className={classes.heading}>
            LAVENDRO
          </Typography>
          <Grid container justify="center">
            <Grid item lg={10} md={10}>
              <Typography variant="h4" className={classes.heading}>
                Laundry Management System
              </Typography>
            </Grid>
          </Grid>
          <Grid container justify="center">
            <Grid item lg={9} md={9}>
              <Typography variant="subtitle1" className={classes.heading}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={7} md={7}>
          <Lottie
            className={classes.lottie}
            style={{ height: "75vh", width: "100%" }}
            options={defaultOptions}
          />
        </Grid>
      </Grid>
      <Facilities />
    </div>
  );
};

export default Landing;
