import React from "react";
import user from "../../assets/user.gif";
import { Grid, Typography } from "@material-ui/core";
import { useStyles } from "./ProfileStyles";
const Profile = () => {
  const classes = useStyles();
  return (
    <div>
      <Grid
        container
        justify="center"
        style={{ backgroundColor: "#565656", minHeight: "100vh" }}
      >
        <Grid
          item
          lg={10}
          md={10}
          style={{
            backgroundColor: "white",
            margin: "12vh 0 12vh 0",
            boxShadow: "8px 12px 8px #000",
            borderRadius: "5px",
          }}
        >
          <Grid container justify="center">
            <Grid
              item
              lg={4}
              md={4}
              justify="center"
              style={{ backgroundColor: "#777777", minHeight: "76vh" }}
            >
              <img src={user} className={classes.image} alt="" />
            </Grid>
            <Grid item lg={1} md={1}></Grid>
            <Grid item lg={7} md={7}>
              <Grid container style={{ paddingTop: "6%" }}>
                <Grid item>
                  <Typography variant="h3">XYZ</Typography>
                </Grid>
              </Grid>
              <Grid container style={{ padding: "5% 0 5% 0" }}>
                <Grid item>
                  <Grid container style={{ padding: "0% 0 0% 0" }}>
                    <Grid item>
                      <Typography variant="h5">
                        Roll number: 111111111
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container style={{ padding: "1% 0 0% 0" }}>
                    <Grid item>
                      <Typography variant="h5">
                        Email: xyz@thapar.edu
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container style={{ padding: "1% 0 0% 0" }}>
                    <Grid item>
                      <Typography variant="h5">Hostel: N</Typography>
                    </Grid>
                  </Grid>
                  <Grid container style={{ padding: "1% 0 0% 0" }}>
                    <Grid item>
                      <Typography variant="h5">Floor: 12</Typography>
                    </Grid>
                  </Grid>
                  <Grid container style={{ padding: "1% 0 0% 0" }}>
                    <Grid item>
                      <Typography variant="h5">Laundry number: 2132</Typography>
                    </Grid>
                  </Grid>
                  <Grid container style={{ padding: "1% 0 0% 0" }}>
                    <Grid item>
                      <Typography variant="h5">Laundry day: tues</Typography>
                    </Grid>
                  </Grid>
                  <Grid container style={{ padding: "1% 0 0% 0" }}>
                    <Grid item>
                      <Typography variant="h5">
                        Laundry card: card link
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Profile;
