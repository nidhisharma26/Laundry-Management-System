import * as React from "react";
import { AppBar, Toolbar, Typography, Button, Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import logo from "../../assets/logoo.png";
import { Link } from "react-router-dom";
import {firebaseAuth} from '../realbackend/firebase';
import {  signOut } from "firebase/auth";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    // alignItems: "center",
    height: "15vh",
    width: "100vw",
  },
  nav: {
    paddingTop: "1%",
    paddingBottom: "0.5%",
    backgroundColor: "transparent",
    // position: "fixed",
    fontFamily: "Montserrat, tahoma, verdana, sans-serif",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    zIndex: "101",
    color: "#000",
  },
  button: {
    textDecoration: "none",
    color: "black",
    zIndex: "101",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

export default function ButtonAppBar(props) {
  const history = useHistory();
  const classes = useStyles();
  const logout =()=>{
    signOut(firebaseAuth);
    console.log("logginout");
     
    history.push("/loginpage");
  } 
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const model = () => {
  //   return (

  //   );
  // };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.nav}>
        <Toolbar>
          <img
            style={{ height: "5%", width: "6%", zIndex: "101" }}
            src={logo}
            alt=""
          />
          <Typography variant="h4" className={classes.title}>
            <span
              style={{
                color: "#000",
                fontWeight: "bold",
                marginLeft: "1%",
              }}
            >
              Lavendro
            </span>{" "}
            <br />
            <Typography
              //   variant="caption"
              style={{ fontSize: "10px", zIndex: "101", marginLeft: "1%" }}
              className={classes.title}
            >
              BUILT WITH {`<3`} BY @COE17
            </Typography>
          </Typography>
          <Button
            color="inherit"
            className={classes.button}
            style={{ margin: "1%", zIndex: "101" }}
          >
            Home
          </Button>
          <Link to="/profile">
            <Button
              color="inherit"
              className={classes.button}
              style={{ margin: "1%", zIndex: "101" }}
            >
              Profile
            </Button>
          </Link>
          <Button
            color="inherit"
            onClick={handleOpen}
            className={classes.button}
            style={{ margin: "1%", zIndex: "101" }}
          >
            Slip
          </Button>
          <Button
            onClick={logout}
            color="inherit"
            className={classes.button}
            style={{ margin: "1%", zIndex: "101" }}
          >
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
