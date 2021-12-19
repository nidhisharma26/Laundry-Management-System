import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  heading: {
    fontWeight: "bold",
    color: "#4FA64F",
  },
  rating: {
    color: "#4FA64F",
  },
  lottie: {
    width: "50%",
    height: "20vh",
    objectFit: "contain",
  },
  text: {
    backgroundColor: "#ABD5AB",
    color: "#4FA64F",
    width: "100%",
    // minHeight: "30vh",
    // border: "1px solid purple",
  },
  btn: {
    padding: "40px",
  },
}));
