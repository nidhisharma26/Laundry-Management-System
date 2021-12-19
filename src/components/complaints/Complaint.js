import React from "react";
import {
  Grid,
  Typography,
  TextField,
  Box,
  Button,
  Checkbox,
} from "@mui/material";
import { useStyles } from "./ComplaintStyles";
import Lottie from "react-lottie";
import complaint from "./complaint.json";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Complaint = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: complaint,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <>
      <Grid container lg={12} md={12} justify="center">
        <Grid item lg={12} md={12}>
          <Grid
            container
            lg={12}
            md={12}
            justify="center"
            // style={{ textAlign: "center" }}
          >
            <Grid
              item
              lg={4}
              md={4}
              style={{
                backgroundColor: "#ABD5AB",
                padding: "3% 0 3% 0",
                minHeight: "100vh",
                textAlign: "center",
              }}
            >
              <Typography
                variant="h3"
                style={{ textAlign: "center", padding: "0 10% 0 10%" }}
                className={classes.heading}
              >
                Feel free to tell us your complaints.
              </Typography>
              <Lottie
                className={classes.lottie}
                style={{ height: "60vh", width: "100%" }}
                options={defaultOptions}
              />
            </Grid>
            <Grid item lg={7} md={7} style={{ padding: "3% 0 3% 3%" }}>
              <Typography variant="h4" className={classes.heading}>
                Please tell us your complaint and we will definitely try to
                improve it.
              </Typography>
              {/* <Rating
                onChange={(rate) => alert(rate)}
                stop={10}
                iconHover="purple"
                className={classes.rating}
              /> */}
              <Grid container>
                <Grid item lg={10} md={10} style={{ padding: "2% 0 3% 0" }}>
                  <Box
                    sx={{
                      "& > legend": { mt: 2 },
                    }}
                  >
                    <Grid container>
                      <Grid item lg={4} md={4}>
                        <Checkbox {...label} />
                        <Typography variant="subtitle2">
                          To Laundry Management
                        </Typography>
                      </Grid>
                      <Grid item lg={4} md={4}>
                        <Checkbox {...label} />
                        <Typography variant="subtitle2">
                          To Shop Owner
                        </Typography>
                      </Grid>
                      <Grid item lg={4} md={4}>
                        <Checkbox {...label} />
                        <Typography variant="subtitle2">
                          To Higher Authority
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
              <Grid container lg={12} md={12} justify="center">
                <Grid item lg={12} md={12}>
                  <Box className={classes.text}>
                    <TextField
                      multiline={true}
                      rows={7}
                      name="Complaint"
                      label="Complaint"
                      placeholder="Please drop your complaint."
                      autoComplete="on"
                      style={{ width: "100%", color: "#4FA64F" }}
                      variant="outlined"
                      //   value={description}
                      //   onChange={(e) => setDescription(e.target.value)}
                    />
                  </Box>
                </Grid>
              </Grid>
              <Grid
                container
                lg={12}
                md={12}
                justify="center"
                style={{ paddingTop: "6%" }}
              >
                <Grid item lg={10} md={10}>
                  <Button
                    variant="contained"
                    style={{
                      padding: " 15px 40px",
                      fontSize: "16px",
                      backgroundColor: "#4FA64F",
                      color: "#ABD5AB",
                      justifyContent: "center",
                    }}
                  >
                    Send Complaint
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Complaint;
