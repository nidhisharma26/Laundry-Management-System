import React from "react";
import { Grid, Typography, TextField, Box, Button } from "@mui/material";
import { useStyles } from "./FeedbackStyles";
import Rating from "@mui/material/Rating";
import Lottie from "react-lottie";
import rating from "./rating.json";
// import Rating from "react-rating";

const Feedback = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: rating,
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
                backgroundColor: "lavender",
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
                Feel free to drop us your feedback.
              </Typography>
              <Lottie
                className={classes.lottie}
                style={{ height: "60vh", width: "100%" }}
                options={defaultOptions}
              />
            </Grid>
            <Grid item lg={7} md={7} style={{ padding: "3% 0 3% 3%" }}>
              <Typography variant="h4" className={classes.heading}>
                How satisfied are you overall with the support of our system?
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
                    <Rating
                      name="simple-controlled"
                      value={value}
                      //   style={{ height: "2vh", width: "20%" }}
                      size="large"
                      onChange={(event, newValue) => {
                        setValue(newValue);
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
              <Grid container lg={12} md={12} justify="center">
                <Grid item lg={12} md={12}>
                  <Box className={classes.text}>
                    <TextField
                      multiline={true}
                      rows={7}
                      name="Feedback"
                      label="Feedback"
                      placeholder="Please share your feedback."
                      autoComplete="on"
                      style={{ width: "100%", color: "purple" }}
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
                      backgroundColor: "purple",
                      color: "lavender",
                      justifyContent: "center",
                    }}
                  >
                    Send Feedback
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

export default Feedback;
